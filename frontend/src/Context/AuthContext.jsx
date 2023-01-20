import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode'
import { Navigate, useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) =>{

    //for storing tokens from the local storage(user)
    let [userAuthTokens, setUserAuthTokens] = useState(()=> localStorage.getItem('userAuthTokens') ? JSON.parse(localStorage.getItem('userAuthTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('userAuthTokens') ? jwt_decode(localStorage.getItem('userAuthTokens')) : null)

    //for storing tokens from the local storage(admin)
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [admin, setAdmin] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    // let [loading, setLoading] = useState(true)

    //base url to pass as context
    let baseUrl = 'http://127.0.0.1:8000/'

    const navigate = useNavigate()

    //function to login user and get token
    let loginUser = async(e) =>{
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
            setUserAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('userAuthTokens',JSON.stringify(data))
            navigate('/user/home')
        } else {
            console.log('something went wrong');
            Swal.fire("Error","Invalid credentials")
        }
    }

    //function to logout user and delete token from local storage
    let logoutUser = ()=>{

        Swal.fire({
            title: 'Confirm!',
            text: 'Do you want to Logout ?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton:true
        }).then((result)=>{
            if (result.isConfirmed) {
                setUser(null)
                setUserAuthTokens(null)
                console.log('ppopop');
                localStorage.removeItem('userAuthTokens')
                navigate('/')
            }
        })
        
    }

    //function to login admin
    let loginAdmin = async(e) =>{
        console.log('works well');
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/admin/token/',{
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
            Swal.fire("Error","Invalid credentials")
        }
    }

    //function to logout admin and remove token from local storage
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

    //update token to get new access token before it expires
    let updateToken = async ()=>{
        console.log('update token called');
        let response = await fetch('http://127.0.0.1:8000/api/admin/token/refresh/',{
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

    //function to update user token
    let updateUserToken = async ()=>{
        console.log('update token called');
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/',{
            method:'POST',
            headers:{
                'Content-Type':'application/JSON'
            },
            body:JSON.stringify({'refresh':userAuthTokens?.refresh})
        })

        let data = await response.json()

        if (response.status === 200) {
            console.log('updated ');
            setUserAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('userAuthTokens',JSON.stringify(data))
            
        } else {
            console.log('not updated');
            loginUser()
            
        }

        // if (loading) {
        //     setLoading(false)
        // }
    }

    //fucntion to call the update token every 4 minutes
    useEffect(()=>{

        // if (loading) {
        //     updateToken()
        // }
        console.log('interval time aageya');
        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(()=>{
            if (authTokens) {
                console.log('here it is');
                updateToken()
            }
            if (userAuthTokens) {
                console.log('it also works');
                updateUserToken()
            }
        }, fourMinutes)

        return ()=> clearInterval(interval)

    }, [authTokens,userAuthTokens])


    let contextData = {
        baseUrl:baseUrl,
        user:user,
        admin:admin,
        authTokens:authTokens,
        userAuthTokens:userAuthTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
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
