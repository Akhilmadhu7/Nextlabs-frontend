import React, {useContext, useState} from "react";
import AuthContext from "../../Context/Admin/AuthContext";
import {useForm} from 'react-hook-form'

function LoginPage() {

    let {loginAdmin }= useContext(AuthContext)

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm()

    const [userData, setUserData] = useState({
        username : '',
        password : ''
    })

    const handleChange = (e) =>{
        console.log('name and password',e.target.name,e.target.value);
        setUserData({
            ...userData,
            [e.target.name]:e.target.value
        })
    }
  return (
    <div>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Sign in
          </h1>
          <form onSubmit={loginAdmin} className="mt-6">
            <div className="mb-2">
              <label
                for="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Username
              </label>
              <input
                {...register('username', {
                    required:'Username required'
                  })}
                type="text"
                name="username"
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.username && (
                <small className="text-red-500">
                  {errors.username.message}
                </small>
                )}
            </div>
            <div className="mb-2">
              <label
                for="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                {...register('password',{
                    required:"Password required"
                })}
                type="password"
                name="password"
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
                {errors.password && (
                 <small className="text-red-500">
                    {errors.password.message}
                 </small>
                )}
            </div>
            <a href="#" className="text-xs text-purple-600 hover:underline">
              Forget Password?
            </a>
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don't have an account?{" "}
            <a href="#" className="font-medium text-purple-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
