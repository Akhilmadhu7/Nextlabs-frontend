import React from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext'

const UserPrivateRoutes = () => {
    
    let {userAuthTokens} = useContext(AuthContext)

  return (
  
        userAuthTokens ? <Outlet/> : <Navigate to ='/' exact />
  
  )
}

export default UserPrivateRoutes