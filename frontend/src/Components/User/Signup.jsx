import React, { useState , useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Axios from 'axios'
import { useForm } from "react-hook-form";

function Signup() {

    let baseUrl = 'http://127.0.0.1:8000/'
    console.log('base url is ',baseUrl);
    const navigate = useNavigate()

    //for validation
    const {
        register,
        handleSubmit,
        getValues,
        formState:{errors}
      } = useForm();
    
      //storing the userdata
    const [userData,setUserData] = useState({
        username:'',
        email:'',
        password:'',
        password2:''
    })
    //for showing the error from the backend.
    const [errorData, setErrorData] = useState([])

    const handleChange =(e)=>{
        setUserData({
            ...userData,
            [e.target.name]:e.target.value
        })
    }

    //sending user details to backend to create an account.
    const onSubmit = (data, e) =>{
        e.preventDefault();
    
        try {
          Axios.post(baseUrl+'accounts/signup',{
            
            username: userData.username,
            phone: userData.phone,
            email: userData.email,
            password: userData.password,
            password2: userData.password2
          }).then((res) =>{
            navigate('/')
            
          }).catch((error)=>{
            console.log(error.response)
            const{data:{Response}} = error.response
            setErrorData(Response)
          })
          
        } catch ( error) {
          console.log('errors',error);
        }
      }


  return (
    <div>
        
        <div>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                    <a href="/">
                        <h3 className="text-4xl font-bold text-purple-600">
                            Logo
                        </h3>
                    </a>
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Username
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    {...register("username",{
                                        required: "Username required"
                                      })}
                                      type="text"
                                      onChange={handleChange}
                                      name="username"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                {errors.username && (
                                 <small className="text-red-500">
                                    {errors.username.message}
                                 </small>
                                )}
                                <small className="text-red-600">{errorData.username}</small>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    {...register("email", {
                                        required: "Email required",
                                        pattern: {
                                          value: /^[a-zA-Z0-9-_]+@[a-zA-Z0-9]{2,5}\.[a-z]{2,3}$/,
                                          message: "Invalid email",
                                        },
                                      })}
                                      type="email"
                                      onChange={handleChange}
                                      name="email"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                {errors.email && (
                                <small className="text-red-500">
                                  {errors.email.message}
                                 </small>
                                 )}
                                <small className="text-red-600">{errorData.email}</small>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    {...register("password", {
                                        required: "Password required",
                                        pattern: {
                                          value: /^[a-zA-Z0-9]{8}[0-9]*[A-Za-z]*$/,
                                          message: "Password should be strong"
                                        },
                                        minLength: {
                                          value: 8,
                                          message: "Password should not be less than 8 characters"
                                        }
                                      })}
                                      type="password"
                                      onChange={handleChange}
                                      name="password"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                {errors.password && (
                                <small className="text-red-500">
                                    {errors.password.message}
                                </small>
                                )}
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Confirm Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    {...register("password2", {
                                        required: "Password required",
                                        pattern: {
                                          value: /^[a-zA-Z0-9]{8}[0-9]*[A-Za-z]*$/,
                                          message: "Password should be strong"
                                        },
                                        minLength: {
                                          value: 8,
                                          message: "Password should not be less than 8 characters"
                                        },
                                        validate:(value) => {
                                          const {password} = getValues();
                                          return password === value || 'Password should match'
                                        }
                                      })}
                                      type="password"
                                      onChange={handleChange}
                                      name="password2"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                {errors.password2 && (
                                <small className="text-red-500">
                                    {errors.password2.message}
                                </small>
                                )}
                            </div>
                        </div>
                        <a
                            href="#"
                            className="text-xs text-purple-600 hover:underline"
                        >
                            Forget Password?
                        </a>
                        <div className="flex items-center mt-4">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-grey-600">
                        Already have an account?{" "}
                        <span>
                            <Link to='/' className="text-purple-600 hover:underline" >
                                Log in
                            </Link>
                        </span>
                    </div>
                    
                </div>
            </div>
        </div>
    

    </div>
  )
}

export default Signup