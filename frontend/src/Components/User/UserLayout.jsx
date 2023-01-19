import React from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function UserLayout() {
  return (
    <div className='flex'>
    
        <div>
            <Sidebar/>
        </div>
        <div className='w-full p-2'>
            <Outlet></Outlet>
        </div>
        

    </div>
  )
}

export default UserLayout