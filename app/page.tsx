"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Heart, TrendingUp, Zap } from "lucide-react"

export default function WelcomePage() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center animate-fadeIn">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/30 blur-2xl rounded-full"></div>
              <Leaf className="w-16 h-16 text-accent relative" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-pretty">
            Welcome to <span className="text-accent">Serenify</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/80 mb-8 text-pretty max-w-2xl mx-auto">
            Your personal mental wellness companion. Track your mood, build healthy habits, and discover insights about
            your wellbeing journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/login">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="border-accent/50 hover:bg-accent/10 bg-transparent">
                Create Account
              </Button>
            </Link>
          </div>

          {/* Feature Preview */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
              <CardHeader className="text-center">
                <Heart className="w-8 h-8 text-accent mx-auto mb-2" />
                <CardTitle className="text-foreground">Daily Mood Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/70">Log your emotional state with our intuitive emoji slider</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
              <CardHeader className="text-center">
                <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
                <CardTitle className="text-foreground">Smart Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/70">Visualize patterns and trends in your wellness data</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
              <CardHeader className="text-center">
                <Zap className="w-8 h-8 text-accent mx-auto mb-2" />
                <CardTitle className="text-foreground">Habit Building</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/70">Build streaks and earn rewards for consistency</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="px-4 py-16 md:py-24 border-t border-border/50 bg-card/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-foreground/80 italic mb-4">
            "Serenify helped me understand my emotional patterns and build habits that truly matter to my wellbeing."
          </p>
          <p className="text-accent font-semibold">Sarah M. • Wellness Enthusiast</p>
        </div>
      </section>
    </main>
  )
}
