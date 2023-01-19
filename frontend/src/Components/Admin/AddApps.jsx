import React,{useState, useContext} from 'react'
import AddImage from './AddImage'
import {useForm} from 'react-hook-form'
import AuthContext from '../../Context/AuthContext'
import Axios from 'axios'

function AddApps() {

    let {baseUrl,authTokens} = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm()

    const [appData, setAppData] = useState({
        app_name:'',
        app_link:'',
        app_image:'',
        app_category:'',
        app_subcategory:'',
        app_points:''
    })

    const handleChange = (e)=>{
        setAppData({
            ...appData,
            [e.target.name]:e.target.value
        })
    }

    const uploadApplication = ()=>{
        try {
            Axios.post(baseUrl+'add-app',{
                headers:{
                    'Authorization':`Bearer ${authTokens.access}`,
                    
                }
            })
        } catch (error) {
            
        }
    }

  return (
    <div className=" ">
    <div className="sm:px-16 h-full ">
      <div className="mx-3 my-3 sm:px-6">
        <div className=" mt-10 p-6 m-auto bg- rounded-md  mb-3 ring-2 ring-indigo-600 ">
          <div className="">
            <h1 className="text-indigo-700  text-center text-3xl font-semibold underline uppercase decoration-wavy">
              Add Application
            </h1>
          </div>

          <div className="bg-slate-200 rounded-md mt-4">
            <form >
                <div className=''>
                <div className='py-2'>

                <AddImage></AddImage>
                </div>
                <div></div>
                </div>
              <div className=" justify-around grid grid-cols-2">
                <div className="mx-4 my-2 text-left  col-span-2 md:col-span-1 px-[45px] md:px-0 ">
                  <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800 "
                  >
                    App Name
                  </label>
                  <input
                      {...register("app_name", {
                        required: "Name is required",
                      })}
                    onChange={handleChange}
                    type="text"
                    name="app_name"
                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                   {errors.app_name && (
                    <small className="text-red-500">
                      {errors.app_name.message}
                    </small>
                  )}
                  {/* <small className="text-red-600">{errorData.f_name}</small> */}
                </div>

                <div className="mx-4 text-left my-2 col-span-2 md:col-span-1 px-[45px] md:px-0">
                  <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800 "
                  >
                    App Link
                  </label>
                  <input
                      {...register("app_link", {
                        required: "App Link is required",
                      })}
                    onChange={handleChange}
                    type="text"
                    name="app_link"
                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.app_link && (
                    <small className="text-red-500">
                      {errors.app_link.message}
                    </small>
                  )}
                 {/* <small className="text-red-600">{errorData.f_name}</small> */}
                </div>
              </div>

              <div className=" justify-around grid grid-cols-2">
                <div className="mx-4 text-left my-2 col-span-2 md:col-span-1 px-[45px] md:px-0">
                  <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800 "
                  >
                    App category
                  </label>
                  <input
                      {...register("app_category", {
                        required: "app_category is required",
                      })}
                    onChange={handleChange}
                    
                    type="text"
                    name="app_category"
                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.app_category && (
                    <small className="text-red-500">
                      {errors.app_category.message}
                    </small>
                  )}
                  {/* <small className="text-red-600">{errorData.username}</small> */}
                </div>
                <div className="mx-4 text-left my-2 col-span-2 md:col-span-1 px-[45px] md:px-0">
                  <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800 "
                  >
                    App subcategory
                  </label>
                  <input
                      {...register("app_subcategory", {
                        required: "App subcategory is required",
                      })}
                    onChange={handleChange}
                   
                    type="email"
                    name="app_subcategory"
                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                   {errors.app_subcategory && (
                    <small className="text-red-500">
                      {errors.app_subcategory.message}
                    </small>
                  )}
                   {/*<small className="text-red-600">{errorData.email}</small> */}
                </div>
              </div>
              <div>
                <div className="">
                  <div className="  ">
                    <button className="m-3  px-8 py-3 text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AddApps