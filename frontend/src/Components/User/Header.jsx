import React, {useContext} from 'react'
import AuthContext from '../../Context/AuthContext'

function Header() {

    let {user,logoutUser} = useContext(AuthContext)
  return (
    <div>
        <nav className="bg-slate-300 flex rounded-md mb-2 justify-between">
        <div className=" mx-6 my-4">
          
        </div>

        <div className="my-4 mx-6 flex">
          <div className="mx-5 text-indigo-700 mt-auto">
            {<h3 className="font-bold">{user && <p> {user.username}</p>}</h3>}
          </div>

          <button
            onClick={logoutUser}
            className=" w-full px-2 py-1 tracking-wide bg-slate-200 font-medium transition-colors duration-200 transform bg-white-700 rounded-md hover:bg-violet-50 hover:text-red-600 focus:outline-none "
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Header