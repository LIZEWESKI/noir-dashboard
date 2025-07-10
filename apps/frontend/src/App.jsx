import React from 'react'
import { RouterProvider,createBrowserRouter,createRoutesFromElements,Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import AuthProvider from './context/AuthProvider'
export const LOGIN_ROUTE= "/login";
const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path={LOGIN_ROUTE} element={<Login/>}/>
      </Route>
  ))
  return (
    <AuthProvider >
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App