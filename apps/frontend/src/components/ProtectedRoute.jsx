import  React from "react"
import { useAuth } from "@/contexts/AuthProvider"
import { Navigate, useLocation } from "react-router-dom"

export function ProtectedRoute({ children, fallback, redirectTo = "/login" }) {
  const { user, loading, isAuthenticated } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Checking authentication...</span>
        </div>
      )
    )
  }

  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return children
}
