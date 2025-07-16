import { LOGIN_ROUTE } from '@/App'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthProvider'
import React from 'react'
import { Link } from 'react-router-dom'
const Dashboard = () => {
  const {logout,isAuthenticated, user} = useAuth();
  return (
    <>
     <h1>This is Dashboard Page</h1>
     {!isAuthenticated && <Link to={LOGIN_ROUTE}>Go to Login</Link>}
     {isAuthenticated && <Button onClick={logout}>
        Logout {user.name}
     </Button>}
    </>
  )
}

export default Dashboard