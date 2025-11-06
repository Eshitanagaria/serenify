"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Save } from "lucide-react"

interface ReflectionPrompt {
  id: number
  question: string
  category: string
  icon: string
}

const reflectionPrompts: ReflectionPrompt[] = [
  {
    id: 1,
    question: "What were the highlights of your week?",
    category: "Positivity",
    icon: "✨",
  },
  {
    id: 2,
    question: "What challenges did you face and how did you overcome them?",
    category: "Growth",
    icon: "🏔️",
  },
  {
    id: 3,
    question: "Which habit made the biggest impact on your wellbeing?",
    category: "Habits",
    icon: "🎯",
  },
  {
    id: 4,
    question: "How has your mood evolved this week?",
    category: "Emotions",
    icon: "📈",
  },
  {
    id: 5,
    question: "What self-care moments are you most grateful for?",
    category: "Gratitude",
    icon: "🙏",
  },
  {
    id: 6,
    question: "What's your intention for next week?",
    category: "Planning",
    icon: "🎪",
  },
]

export default function ReflectPage() {
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null)
  const [responses, setResponses] = useState<{ [key: number]: string }>({})
  const [saved, setSaved] = useState(false)

  const handleResponseChange = (id: number, value: string) => {
    setResponses((prev) => ({ ...prev, [id]: value }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const currentPromptId = selectedPrompt
  const currentPrompt = reflectionPrompts.find((p) => p.id === currentPromptId)

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Weekly Reflection</h1>
          <p className="text-foreground/70">Take time to reflect on your wellness journey</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Prompts List */}
          <div className="space-y-3">
            {reflectionPrompts.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => setSelectedPrompt(prompt.id)}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  selectedPrompt === prompt.id
                    ? "bg-accent text-accent-foreground"
                    : "bg-card/50 border border-border/50 hover:bg-card/70 text-foreground"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-2xl mt-1">{prompt.icon}</span>
                    <div className="text-left">
                      <p className="font-medium">{prompt.question}</p>
                      <span className="text-xs opacity-70">{prompt.category}</span>
                    </div>
                  </div>
                  {responses[prompt.id] && <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>}
                </div>
              </button>
            ))}
          </div>

          {/* Response Area */}
          <div className="lg:col-span-2">
            {currentPrompt ? (
              <Card className="bg-card/50 border-border/50 h-full">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <span className="text-4xl">{currentPrompt.icon}</span>
                    <div>
                      <span className="text-sm bg-accent/20 text-accent px-3 py-1 rounded-full">
                        {currentPrompt.category}
                      </span>
                      <CardTitle className="text-xl mt-3">{currentPrompt.question}</CardTitle>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <textarea
                    value={responses[currentPrompt.id] || ""}
                    onChange={(e) => handleResponseChange(currentPrompt.id, e.target.value)}
                    placeholder="Share your thoughts, feelings, and insights..."
                    className="w-full p-4 bg-input border border-border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    rows={12}
                  />

                  <div className="flex gap-3">
                    <Button
                      onClick={handleSave}
                      className={`flex-1 transition-all ${
                        saved ? "bg-green-600 hover:bg-green-600" : "bg-accent hover:bg-accent/90"
                      } text-accent-foreground`}
                    >
                      {saved ? (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Response Saved
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Response
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Writing Tips */}
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium text-foreground mb-2">Writing Tips:</p>
                    <ul className="text-xs text-foreground/70 space-y-1 list-disc list-inside">
                      <li>Be honest and authentic</li>
                      <li>There are no right or wrong answers</li>
                      <li>Take your time to process your thoughts</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card/50 border-border/50 flex items-center justify-center h-96">
                <CardContent className="text-center">
                  <p className="text-foreground/70 mb-4">Select a reflection prompt to get started</p>
                  <ChevronRight className="w-8 h-8 text-foreground/50 mx-auto animate-pulse" />
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Past Reflections */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Past Reflections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { week: "This week", date: "Nov 1-7", responses: 4 },
              { week: "Last week", date: "Oct 25 - Oct 31", responses: 6 },
              { week: "2 weeks ago", date: "Oct 18 - Oct 24", responses: 6 },
            ].map((reflection, index) => (
              <div
                key={index}
                className="p-4 bg-muted/50 rounded-lg flex items-center justify-between hover:bg-muted transition-colors"
              >
                <div>
                  <p className="text-foreground font-medium">{reflection.week}</p>
                  <p className="text-xs text-foreground/60">{reflection.date}</p>
                </div>
                <p className="text-sm bg-accent/20 text-accent px-3 py-1 rounded-full">
                  {reflection.responses}/{reflectionPrompts.length}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
