"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Download } from "lucide-react"
import { useState } from "react"

const monthlyData = [
  { month: "Jan", mood: 6.5, sleep: 6, stress: 7 },
  { month: "Feb", mood: 7, sleep: 6.5, stress: 6.5 },
  { month: "Mar", mood: 7.5, sleep: 7, stress: 6 },
  { month: "Apr", mood: 8, sleep: 7.5, stress: 5.5 },
  { month: "May", mood: 7.8, sleep: 7.3, stress: 5.8 },
  { month: "Jun", mood: 8.2, sleep: 7.5, stress: 5 },
]

const correlationData = [
  { sleep: 5, mood: 4 },
  { sleep: 6, mood: 6 },
  { sleep: 7, mood: 8 },
  { sleep: 8, mood: 9 },
  { sleep: 7.5, mood: 8.5 },
  { sleep: 6.5, mood: 7 },
  { sleep: 8, mood: 8.5 },
  { sleep: 5.5, mood: 5 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month")

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Insights</h1>
            <p className="text-foreground/70">Deep dive into your wellness patterns</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-border/50 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2">
          {["week", "month", "year"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                timeRange === range ? "bg-accent text-accent-foreground" : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Key Insights */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="pt-6">
              <p className="text-foreground/70 text-sm font-medium mb-2">Mood Improvement</p>
              <p className="text-3xl font-bold text-accent">+23%</p>
              <p className="text-xs text-foreground/60 mt-2">compared to last month</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="pt-6">
              <p className="text-foreground/70 text-sm font-medium mb-2">Sleep Consistency</p>
              <p className="text-3xl font-bold text-accent">92%</p>
              <p className="text-xs text-foreground/60 mt-2">tracking compliance</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="pt-6">
              <p className="text-foreground/70 text-sm font-medium mb-2">Stress Reduction</p>
              <p className="text-3xl font-bold text-accent">-18%</p>
              <p className="text-xs text-foreground/60 mt-2">over the past 3 months</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle>6-Month Wellness Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--foreground)" />
                <YAxis stroke="var(--foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "var(--foreground)" }}
                />
                <Legend />
                <Line type="monotone" dataKey="mood" stroke="var(--accent)" strokeWidth={2} name="Mood" />
                <Line type="monotone" dataKey="sleep" stroke="var(--secondary)" strokeWidth={2} name="Sleep (hrs)" />
                <Line type="monotone" dataKey="stress" stroke="var(--chart-4)" strokeWidth={2} name="Stress (1-10)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Sleep & Mood Correlation</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" dataKey="sleep" name="Hours of Sleep" stroke="var(--foreground)" />
                <YAxis type="number" dataKey="mood" name="Mood Score" stroke="var(--foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "var(--foreground)" }}
                  cursor={{ fill: "rgba(158, 197, 171, 0.1)" }}
                />
                <Scatter name="Sleep vs Mood" data={correlationData} fill="var(--accent)" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights Section */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { insight: "You're most productive when you sleep 7-8 hours per night", emoji: "💡" },
              { insight: "Your mood peaks on Fridays and weekends", emoji: "📈" },
              { insight: "Meditation reduces your stress by an average of 2 points", emoji: "🧘" },
              { insight: "Consistency is key: Your best weeks start with morning routines", emoji: "⏰" },
            ].map((item, index) => (
              <div key={index} className="p-4 bg-muted/50 rounded-lg flex gap-3">
                <span className="text-xl">{item.emoji}</span>
                <p className="text-foreground text-sm">{item.insight}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
