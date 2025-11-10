import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST() {
  try {
    const supabase = await createClient()
    
    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json(
        { suggestion: "Please log in to get AI insights." }, 
        { status: 401 }
      )
    }
    
    // Fetch last 7 days of mood data from correct table
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const { data: weekData, error } = await supabase
      .from("moods")  // Fixed: Use correct table name
      .select("created_at, mood_score, energy_level, sleep_hours, notes")
      .eq("user_id", user.id)
      .gte("created_at", sevenDaysAgo.toISOString())
      .order("created_at", { ascending: false })
      .limit(10)
    
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    
    if (!weekData || weekData.length === 0) {
      return NextResponse.json({ 
        suggestion: "🌱 Start tracking your mood to get personalized AI insights!" 
      })
    }
    
    // Format data for AI
    const energyLabels = ["Very Low", "Low", "Medium", "High", "Very High"]
    const userSummary = weekData
      .map((d: any) => {
        const date = new Date(d.created_at).toLocaleDateString()
        return `${date}: Mood ${d.mood_score}/5, Energy ${energyLabels[d.energy_level - 1]}, Sleep ${d.sleep_hours}hrs${d.notes ? `, Notes: ${d.notes}` : ''}`
      })
      .join("\n")
    
    // Calculate averages for context
    const avgMood = (weekData.reduce((sum, d) => sum + d.mood_score, 0) / weekData.length).toFixed(1)
    const avgSleep = (weekData.reduce((sum, d) => sum + d.sleep_hours, 0) / weekData.length).toFixed(1)
    const avgEnergy = (weekData.reduce((sum, d) => sum + d.energy_level, 0) / weekData.length).toFixed(1)
    
    // Call Claude API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        messages: [{
          role: "user",
          content: `You are a warm, supportive wellness coach. Analyze this user's recent wellness data and provide encouraging insights.

Recent Check-ins (Last 7 Days):
${userSummary}

Averages: Mood ${avgMood}/5, Energy ${avgEnergy}/5, Sleep ${avgSleep}hrs

Provide:
1. A warm observation about their patterns (2 sentences)
2. 2-3 short, actionable suggestions to improve their wellbeing
3. Encouraging closing words

Keep it friendly, concise (4-5 sentences total), and use 1-2 relevant emojis. Focus on small wins and practical steps.`
        }]
      })
    })
    
    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`)
    }
    
    const data = await response.json()
    const suggestion = data.content[0].text || "Couldn't generate insights right now. Try again later."
    
    return NextResponse.json({ suggestion })
    
  } catch (err: any) {
    console.error("AI insights error:", err)
    return NextResponse.json(
      { suggestion: "⚠️ Couldn't generate insights right now. Please try again later." },
      { status: 500 }
    )
  }
}
