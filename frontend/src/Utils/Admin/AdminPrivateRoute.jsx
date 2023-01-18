import React from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../../Context/Admin/AuthContext'

const AdminPrivateRoute = () => {
  let {authTokens} = useContext(AuthContext)

    console.log('Admin private route works');
  return (
    authTokens ? <Outlet/> : <Navigate to ='/loginadmin' />
  )
}

export default AdminPrivateRoute