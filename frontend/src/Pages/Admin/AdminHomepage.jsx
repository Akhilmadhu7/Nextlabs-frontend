import React, {useContext} from 'react'
import Header from '../../Components/Admin/Header'
import AuthContext from '../../Context/Admin/AuthContext'

function AdminHomepage() {
    let {admin} = useContext(AuthContext)
    console.log('here it works on home page');
  return (
    
    <div>
        <div>
            <Header></Header>
        </div>
        This is Admin Home Page
        {admin && 
        <p>hello {admin.username}</p>
        }
        </div>
  )
}

export default AdminHomepage