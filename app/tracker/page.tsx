"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Plus } from "lucide-react"

export default function TrackerPage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [notes, setNotes] = useState("")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const moodEmojis = ["😢", "😟", "😐", "🙂", "😊", "😄", "🤩", "😍", "🥳", "🚀"]

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Daily Check-in</h1>
          <p className="text-foreground/70">How are you feeling today?</p>
        </div>

        {/* Mood Tracker */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Mood Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Emoji Mood Scale */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Select your mood:</p>
              <div className="grid grid-cols-10 gap-2">
                {moodEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedMood(index + 1)}
                    className={`aspect-square rounded-lg flex items-center justify-center text-2xl transition-all ${
                      selectedMood === index + 1 ? "bg-accent scale-110 shadow-lg" : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              {selectedMood && <p className="text-sm text-accent font-medium">You selected: {selectedMood}/10</p>}
            </div>

            {/* Numerical Scale */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Or rate numerically:</p>
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: 10 }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setSelectedMood(i + 1)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedMood === i + 1
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Energy Level */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Energy Level:</label>
              <div className="flex gap-3">
                {["Low", "Medium", "High"].map((level) => (
                  <button
                    key={level}
                    className="px-4 py-2 rounded-lg bg-muted hover:bg-accent hover:text-accent-foreground transition-colors text-foreground"
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Sleep Quality */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Last Night's Sleep:</label>
              <input type="range" min="0" max="12" className="w-full" />
              <p className="text-xs text-foreground/60">Rate your sleep quality (0-12 hours)</p>
            </div>

            {/* Notes */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">Notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-4 bg-input border border-border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                placeholder="What's on your mind? Any thoughts or feelings to share?"
                rows={4}
              />
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              className={`w-full transition-all ${
                saved ? "bg-green-600 hover:bg-green-600" : "bg-accent hover:bg-accent/90"
              } text-accent-foreground`}
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Check-in Saved!
                </>
              ) : (
                "Save Check-in"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Quick Add */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Quick Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Had a good workout", "Felt anxious today", "Great meditation session", "Slept poorly"].map(
              (note, index) => (
                <button
                  key={index}
                  className="w-full p-3 text-left bg-muted hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors text-foreground flex items-center justify-between"
                >
                  <span>{note}</span>
                  <Plus className="w-4 h-4" />
                </button>
              ),
            )}
          </CardContent>
        </Card>

        {/* Recent Check-ins */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Recent Check-ins</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { date: "Today", mood: 8, energy: "High", sleep: "7.5 hrs" },
              { date: "Yesterday", mood: 7, energy: "Medium", sleep: "6 hrs" },
              { date: "2 days ago", mood: 6, energy: "Low", sleep: "5 hrs" },
            ].map((checkin, index) => (
              <div key={index} className="p-3 bg-muted/50 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-foreground font-medium">{checkin.date}</p>
                  <p className="text-xs text-foreground/60 space-x-2">
                    <span>Mood: {checkin.mood}/10</span>
                    <span>•</span>
                    <span>Energy: {checkin.energy}</span>
                    <span>•</span>
                    <span>Sleep: {checkin.sleep}</span>
                  </p>
                </div>
                <span className="text-2xl">{moodEmojis[checkin.mood - 1]}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
