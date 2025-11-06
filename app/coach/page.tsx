"use client"

import { useState, useRef, useEffect } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send, MessageCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Message {
  id: number
  sender: "user" | "coach"
  text: string
  timestamp: Date
}

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "coach",
      text: "Hello! I'm your Wellness Coach. I'm here to support your mental health journey and help you build sustainable habits. What's on your mind today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate coach response
    setTimeout(() => {
      const coachResponses = [
        "That's great insight! Have you considered how this relates to your habits?",
        "I hear you. What would help you feel better right now?",
        "Thank you for sharing. What's one small step you could take today?",
        "That sounds like a meaningful reflection. How can I support you?",
        "I'm here to listen. What would make a difference for you?",
        "That's wonderful progress! How are you feeling about your journey?",
      ]

      const randomResponse = coachResponses[Math.floor(Math.random() * coachResponses.length)]

      const coachMessage: Message = {
        id: messages.length + 2,
        sender: "coach",
        text: randomResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, coachMessage])
      setIsLoading(false)
    }, 800)
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-8 h-8 text-accent" />
            <h1 className="text-3xl font-bold text-foreground">Wellness Coach</h1>
          </div>
          <p className="text-foreground/70">Chat with your AI wellness coach for personalized support</p>
        </div>

        {/* Chat Container */}
        <Card className="bg-card/50 border-border/50 flex flex-col h-[600px]">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="text-lg">Chat with Your Coach</CardTitle>
          </CardHeader>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.sender === "user" ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <CardContent className="border-t border-border/50 pt-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Share your thoughts..."
                className="bg-input border-border text-foreground placeholder-foreground/50"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Prompts */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Quick Prompts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "How can I build better sleep habits?",
                "I'm feeling stressed, what should I do?",
                "How do I stay motivated with my goals?",
                "What's a good meditation technique?",
              ].map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(prompt)
                  }}
                  className="p-3 text-left bg-muted hover:bg-muted/80 rounded-lg transition-colors text-foreground text-sm"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
