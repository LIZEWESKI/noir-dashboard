import { createContext, useContext, useState, useEffect } from "react"
import SecureStorage from "@/lib/secure-storage.js"
import api from "@/lib/axios.js"

const AuthContext = createContext(undefined)

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const savedToken = SecureStorage.getToken()
    if (savedToken) {
      setToken(savedToken)
      fetchUser(savedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const response = await api.get("/api/user")
      setUser(response.data)
    } catch (error) {
      console.error("Failed to fetch user:", error)
      SecureStorage.clearToken()
      setToken(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (values) => {
    try {
      const response = await api.post("/login", values);

      const { token: authToken, user: userData } = response.data;

      console.log("Login successful:", response.data);

      setToken(authToken);
      setUser(userData);
      SecureStorage.setToken(authToken);

    return { success: true };
    } catch (error) {
      if (error.response?.status === 422) {
        return {
          success: false,
          errors: error.response.data.errors,
        };
      }
      console.error("Login error:", error);
      return {
        success: false,
        errors: { general: ["Something went wrong."] },
      };
    }
  };


  const logout = async () => {
    try {
        await api.post("/logout")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setUser(null)
      setToken(null)
      SecureStorage.clearToken()
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        isAuthenticated: !!user && !!token,
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

