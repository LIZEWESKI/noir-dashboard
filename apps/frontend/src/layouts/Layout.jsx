import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex justify-center flex-col min-h-full'>
        <Outlet />
    </div>
  )
}

export default Layout