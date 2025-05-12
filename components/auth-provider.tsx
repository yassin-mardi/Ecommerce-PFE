"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Load user from localStorage on client side
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
        setUser(null)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - in a real app, this would be an API call
    if (email === "user@example.com" && password === "password") {
      const user: User = {
        id: "1",
        name: "John Doe",
        email: "user@example.com",
        role: "user",
      }

      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      setIsLoading(false)
      return { success: true }
    } else if (email === "admin@example.com" && password === "password") {
      const user: User = {
        id: "2",
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
      }

      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      setIsLoading(false)
      return { success: true }
    }

    setIsLoading(false)
    return { success: false, message: "Invalid email or password" }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if email already exists
    if (email === "user@example.com" || email === "admin@example.com") {
      setIsLoading(false)
      return { success: false, message: "Email already in use" }
    }

    // Mock registration - in a real app, this would be an API call
    const user: User = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      role: "user",
    }

    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
    setIsLoading(false)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
