import { createContext, useContext, useState, useEffect } from "react";
import axios from "../lib/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check if user is already logged in (cookie session)
    axios.get("/api/user")
      .then(response => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null); // not logged in
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    await axios.get("/sanctum/csrf-cookie"); // required for Sanctum
    await axios.post("/login", { email, password });
    const { data } = await axios.get("/api/user");
    setUser(data);
  };

  const logout = async () => {
    await axios.post("/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
