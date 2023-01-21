import React, { useState, useContext } from "react";
import AddImage from "./AddImage";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import Axios from "axios";

function AddApps() {
  let { baseUrl, authTokens,admin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [imgError,setImgError] = useState('')
  //for validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //for storing the data
  const [appData, setAppData] = useState({
    created_user:admin.username,
    app_name: "",
    app_link: "",
    app_image: "",
    app_category: "",
    app_subcategory: "",
    app_points: ""
  });


  //function to set the data
  const handleChange = (e) => {
    console.log("name", e.target.name, "value", e.target.value);
    setAppData({
      ...appData,
      [e.target.name]: e.target.value,
    });
  };


  //function to get the image from Addimage component
  const getImage = (appImage) => {
    console.log("app image is ", appImage);
    setAppData({
      ...appData,
      app_image: appImage,
    });
    console.log("here is baser", baseUrl);
  };

  //fucntion to upload the application
  const uploadApplication = () => {
    console.log("upload fucntion", appData);
    console.log("here is baseUrl", baseUrl);
    if (appData.app_image === '') {
      setImgError('Image required')
    }else{
    try {
      Axios.post(baseUrl + "accounts/add-app", appData, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log("her is respponse", res);
          navigate("/admin/home");
        })
        .catch((err) => {
          if (err) {
            
            console.log("here is then error",err.data);
          }
          console.log("here is then error",err.data);
        });
    } catch (error) {
      console.log("ehre is catch error", error);
    }
  }
  };

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
              <form onSubmit={handleSubmit(uploadApplication)}>
                <div className="">
                  <div className="py-2">
                    <AddImage getImage={getImage} imgError={imgError}></AddImage>
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
                        required: "App name is required",
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
                        required: "App category is required",
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
                      type="text"
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
                    <div className=" ">
                      <div className="flex justify-center mt-6 pb-4">
                        <input
                          required
                          name="app_points"
                          onChange={handleChange}
                          type="text"
                          className="px-6 py-3 font-extrabold transition-colors duration-200 transform bg-teal-400 rounded-md text-black focus:outline-none w-fit"
                          placeholder="Addpoint"
                        />
                      </div>
                      {appData.app_points !== '' ? (
                        <div className="flex justify-center mt-6 pb-3">
                          <button className="px-6 py-2 leading-5 text-black transition-colors duration-200 font-extrabold transform bg-amber-300 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                            Submit
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddApps;
