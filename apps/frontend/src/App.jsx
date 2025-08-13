import React from 'react'
import { RouterProvider,createBrowserRouter,createRoutesFromElements,Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Dashboard, { loader as dashboardLoader} from './pages/Dashboard'
import Login from './pages/Login'
import AuthProvider from './contexts/AuthProvider'
import { ThemeProvider } from './contexts/ThemeProvider'
import { GuestRoute } from './components/GuestRoute'
import { ProtectedRoute } from './components/ProtectedRoute'
export const LOGIN_ROUTE= "/login";
const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route index element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
      } loader={dashboardLoader}/>
        
        <Route path={LOGIN_ROUTE} element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }/>
      </Route>
  ))
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthProvider >
        <RouterProvider router={router}/>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App