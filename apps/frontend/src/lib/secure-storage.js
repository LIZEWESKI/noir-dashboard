class SecureStorage { 
  static TOKEN_KEY = "auth_token"

  static setToken(token) {
    try {
      localStorage.setItem(this.TOKEN_KEY, token)
    } catch (error) {
      console.error("Failed to store token:", error)
    }
  }

  static getToken(){
    try {
      const token = localStorage.getItem(this.TOKEN_KEY)
      if (!token) {
        return null
      }
      return token
    } catch (error) {
      console.error("Failed to retrieve token:", error)
      return null
    }
  }

  static clearToken() {
    try {
      localStorage.removeItem(this.TOKEN_KEY)
    } catch (error) {
      console.error("Failed to clear token:", error)
    }
  }

  static isTokenValid() {
    return this.getToken() !== null
  }
}

export default SecureStorage
