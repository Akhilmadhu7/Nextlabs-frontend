import React from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext'

const AdminPrivateRoute = () => {
  let {admin} = useContext(AuthContext)

    console.log('Admin private route works');
  return (
    admin.is_admin ? <Outlet/> : <Navigate to ='/loginadmin' />
  )
}

export default AdminPrivateRoute