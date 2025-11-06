"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AuthFormProps {
  type: "login" | "signup"
  onSubmit: (data: { email: string; password: string; name?: string }) => void
  isLoading?: boolean
}

export function AuthForm({ type, onSubmit, isLoading = false }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === "signup" && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
          <Input
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="bg-input border-border text-foreground placeholder-foreground/50"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Email</label>
        <Input
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="bg-input border-border text-foreground placeholder-foreground/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Password</label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="bg-input border-border text-foreground placeholder-foreground/50 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
      >
        {isLoading ? "Loading..." : type === "login" ? "Sign In" : "Create Account"}
      </Button>
    </form>
  )
}
