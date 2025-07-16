import  React from "react"
import { useAuth } from "@/contexts/AuthProvider"
import { Navigate } from "react-router-dom"


export function GuestRoute({ children, redirectTo = "/" }) {
  const { user, loading, isAuthenticated } = useAuth()

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // If user is authenticated, redirect to dashboard
  if (isAuthenticated && user) {
    return <Navigate to={redirectTo} replace />
  }

  // User is not authenticated, show guest content (login, register, etc.)
  return children
}
