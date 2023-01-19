import React, {useContext} from 'react'
import AdminHome from '../../Components/Admin/AdminHome';
import Header from '../../Components/Admin/Header'
import AuthContext from '../../Context/AuthContext'

function AdminHomepage() {
    let {admin} = useContext(AuthContext)
    console.log('here it works on home page');
  return (
    
    <div>
        <div>
            <Header></Header>
        </div>
        <div>
          <AdminHome></AdminHome>
        </div>
        
        </div>
  )
}

export default AdminHomepage