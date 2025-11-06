"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Zap, BookOpen } from "lucide-react"

interface OnboardingStep {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

const steps: OnboardingStep[] = [
  {
    id: 1,
    title: "Set Your Wellness Goals",
    description: "Tell us what matters most to your mental health journey",
    icon: <Heart className="w-8 h-8" />,
    color: "text-accent",
  },
  {
    id: 2,
    title: "Choose Your Habits",
    description: "Select daily habits you want to build and track",
    icon: <Zap className="w-8 h-8" />,
    color: "text-accent",
  },
  {
    id: 3,
    title: "Learn Your Profile",
    description: "Answer a few questions about your wellness preferences",
    icon: <BookOpen className="w-8 h-8" />,
    color: "text-accent",
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/dashboard")
    }
  }

  const handleSkip = () => {
    router.push("/dashboard")
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-foreground">Welcome to Serenify</h2>
            <button onClick={handleSkip} className="text-foreground/60 hover:text-foreground text-sm font-medium">
              Skip
            </button>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-8 mb-8">
          {steps.map((step, index) => (
            <Card
              key={step.id}
              className={`bg-card/50 border-border/50 transition-all duration-300 ${
                index === currentStep ? "opacity-100 scale-100" : "opacity-50 scale-95 pointer-events-none"
              }`}
            >
              <CardContent className="pt-8">
                <div className="text-center space-y-6">
                  <div className={`flex justify-center ${step.color}`}>{step.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-foreground/70">{step.description}</p>
                  </div>

                  {/* Step Content Based on Step */}
                  <div className="py-6 space-y-4">
                    {index === 0 && (
                      <div className="grid grid-cols-2 gap-3">
                        {["Sleep Better", "Reduce Stress", "Build Habits", "Improve Mood"].map((goal) => (
                          <button
                            key={goal}
                            className="p-3 bg-muted hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors font-medium text-sm"
                          >
                            {goal}
                          </button>
                        ))}
                      </div>
                    )}

                    {index === 1 && (
                      <div className="grid grid-cols-2 gap-3">
                        {["Meditation", "Exercise", "Journaling", "Reading"].map((habit) => (
                          <button
                            key={habit}
                            className="p-3 bg-muted hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors font-medium text-sm"
                          >
                            {habit}
                          </button>
                        ))}
                      </div>
                    )}

                    {index === 2 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <input type="radio" name="preference" id="morning" className="cursor-pointer" />
                          <label htmlFor="morning" className="cursor-pointer flex-1 text-left">
                            I prefer checking in mornings
                          </label>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <input type="radio" name="preference" id="evening" className="cursor-pointer" />
                          <label htmlFor="evening" className="cursor-pointer flex-1 text-left">
                            I prefer checking in evenings
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-center">
          <Button onClick={handleSkip} variant="outline" className="border-border/50 hover:bg-muted bg-transparent">
            Skip
          </Button>
          <Button onClick={handleNext} className="bg-accent hover:bg-accent/90 text-accent-foreground px-8">
            {currentStep === steps.length - 1 ? "Get Started" : "Next"}
          </Button>
        </div>

        {/* Step Counter */}
        <p className="text-center text-foreground/50 text-sm mt-6">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>
    </main>
  )
}
