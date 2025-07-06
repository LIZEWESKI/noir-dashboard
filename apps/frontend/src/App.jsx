import React from 'react'
import { RouterProvider,createBrowserRouter,createRoutesFromElements,Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import { AuthProvider } from './layouts/AuthProvider'
const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='login' element={<Login />}/>
      </Route>
  ))
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App