import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode'
import { Navigate, useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";

const AuthContext = createContext()

export default AuthContext;

export const AdminAuthProvider = ({children}) =>{

    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [admin, setAdmin] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    // let [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    let loginAdmin = async(e) =>{
        console.log('works well');
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/',{
            method:'POST', 
            headers:{
                'Content-Type':'application/JSON'
            },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
        })

        let data = await response.json()
        console.log('data : ',data);

        if (response.status === 200) {
            setAuthTokens(data)
            setAdmin(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            navigate('admin/home')
        } else {
            console.log('something went wrong');
        }
    }

    let logoutAdmin = ()=>{

        Swal.fire({
            title: 'Confirm!',
            text: 'Do you want to Logout ?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton:true
        }).then((result)=>{
            if (result.isConfirmed) {
                setAdmin(null)
                setAuthTokens(null)
                console.log('ppopop');
                localStorage.removeItem('authTokens')
                navigate('/loginadmin')
            }
        })
        
    }

    let updateToken = async ()=>{
        console.log('update token called');
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/',{
            method:'POST',
            headers:{
                'Content-Type':'application/JSON'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()

        if (response.status === 200) {
            console.log('updated ');
            setAuthTokens(data)
            setAdmin(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            
        } else {
            console.log('not updated');
            logoutAdmin()
            
        }

        // if (loading) {
        //     setLoading(false)
        // }
    }

    useEffect(()=>{

        // if (loading) {
        //     updateToken()
        // }
        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(()=>{
            if (authTokens) {
                updateToken()
            }
        }, fourMinutes)

        return ()=> clearInterval(interval)

    }, [authTokens])


    let contextData = {
        admin:admin,
        authTokens:authTokens,
        loginAdmin:loginAdmin,
        logoutAdmin:logoutAdmin
    }


    return(
        <AuthContext.Provider value={contextData} >
            {/* {loading ? null : children} */}
            {children}
        </AuthContext.Provider>
    )
}
