"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Flame, Plus, Trash2 } from "lucide-react"

interface Habit {
  id: number
  name: string
  category: string
  streak: number
  completed: boolean
  frequency: string
  icon: string
}

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      name: "Morning Meditation",
      category: "Mindfulness",
      streak: 12,
      completed: true,
      frequency: "Daily",
      icon: "🧘",
    },
    { id: 2, name: "Exercise", category: "Health", streak: 8, completed: false, frequency: "Daily", icon: "🏃" },
    { id: 3, name: "Journaling", category: "Reflection", streak: 15, completed: true, frequency: "Daily", icon: "📝" },
    { id: 4, name: "Read", category: "Learning", streak: 5, completed: false, frequency: "Daily", icon: "📚" },
    { id: 5, name: "Hydrate", category: "Health", streak: 20, completed: true, frequency: "Daily", icon: "💧" },
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [newHabit, setNewHabit] = useState("")

  const toggleHabit = (id: number) => {
    setHabits(habits.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h)))
  }

  const deleteHabit = (id: number) => {
    setHabits(habits.filter((h) => h.id !== id))
  }

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([
        ...habits,
        {
          id: Math.max(...habits.map((h) => h.id), 0) + 1,
          name: newHabit,
          category: "Other",
          streak: 0,
          completed: false,
          frequency: "Daily",
          icon: "⭐",
        },
      ])
      setNewHabit("")
      setShowAddModal(false)
    }
  }

  const completedCount = habits.filter((h) => h.completed).length
  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0)

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Your Habits</h1>
            <p className="text-foreground/70">Build consistency, one day at a time</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Add Habit
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-foreground/70 text-sm font-medium">Today's Progress</p>
                <p className="text-3xl font-bold text-accent mt-2">
                  {completedCount}/{habits.length}
                </p>
                <div className="w-full bg-muted rounded-full h-2 mt-3">
                  <div
                    className="bg-accent h-2 rounded-full"
                    style={{ width: `${(completedCount / habits.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-foreground/70 text-sm font-medium">Active Habits</p>
                <p className="text-3xl font-bold text-accent mt-2">{habits.length}</p>
                <p className="text-xs text-foreground/60 mt-2">Keep it manageable</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-foreground/70 text-sm font-medium">Total Streak Days</p>
                <p className="text-3xl font-bold text-accent mt-2">{totalStreak}</p>
                <p className="text-xs text-foreground/60 mt-2">Amazing consistency</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Habits List */}
        <div className="space-y-4">
          {habits.map((habit) => (
            <Card key={habit.id} className="bg-card/50 border-border/50 hover:bg-card/70 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => toggleHabit(habit.id)}
                      className={`transition-colors ${habit.completed ? "text-accent" : "text-foreground/50"}`}
                    >
                      {habit.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{habit.icon}</span>
                        <h3
                          className={`font-medium ${habit.completed ? "line-through text-foreground/60" : "text-foreground"}`}
                        >
                          {habit.name}
                        </h3>
                      </div>
                      <div className="flex gap-3 mt-2 text-xs text-foreground/60">
                        <span className="bg-muted px-2 py-1 rounded">{habit.category}</span>
                        <span className="bg-muted px-2 py-1 rounded">{habit.frequency}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {habit.streak > 0 && (
                      <div className="flex items-center gap-1 bg-muted/50 px-3 py-1 rounded-full">
                        <Flame className="w-4 h-4 text-orange-400" />
                        <span className="font-medium text-sm">{habit.streak}</span>
                      </div>
                    )}
                    <button
                      onClick={() => deleteHabit(habit.id)}
                      className="text-foreground/50 hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Habit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md bg-card border-border">
              <CardHeader>
                <CardTitle>Create New Habit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="text"
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  placeholder="What habit do you want to build?"
                  className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
                  onKeyPress={(e) => e.key === "Enter" && addHabit()}
                />
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setShowAddModal(false)
                      setNewHabit("")
                    }}
                    variant="outline"
                    className="flex-1 border-border/50"
                  >
                    Cancel
                  </Button>
                  <Button onClick={addHabit} className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                    Create
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
