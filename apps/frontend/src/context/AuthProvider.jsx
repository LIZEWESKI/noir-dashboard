import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider } from "./ThemeProvider";

const AuthContext = createContext(null);

export default function AuthProvider({children}) {
  const [user, setUser] = useState(undefined);
  useEffect( ()=> {
      axios.get('sanctum/csrf-cookie');
      axios.get('api/user').then((res) => {
        if(res.ok) {
          setUser(res.data);
        }
      })
  },[])


  return (
    <AuthContext.Provider value={{ user }}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  
  return useContext(AuthContext);
}
