import React,{useEffect, useContext, useState} from "react";
import Axios from "axios";
import AuthContext from "../../Context/AuthContext";

function Profile() {

    let {userAuthTokens, user, baseUrl} = useContext(AuthContext)
    const [userData, setUserData] = useState([])

    useEffect(()=>{
        try {
            Axios.get(baseUrl+'accounts/user-profile',{
                headers:{
                    Authorization:`Bearer ${userAuthTokens.access}`,
                    
                }
            }).then((res)=>{
                console.log('here is data ',res.data.Response);
                setUserData(res.data.Response)
            }).catch((res)=>{
                console.log('here is catch',res);
            })
        } catch (error) {
            console.log('her is next catch');
        }
    },[])
  return (
    <div className="bg-slate-300 mb-3">
      <div className="mt-6 grid-rows-2">
        <div>
          <h2 className="text-3xl text-indigo-600">Profile</h2>
        </div>
      </div>

      <div className="pb-5  grid grid-cols-1  place-items-center py-6 ">
        <div class="w-full max-w-sm bg-white border  border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div class="flex justify-end px-4 pt-4"></div>
          <div class="flex flex-col items-center pb-10">
            <svg
              className="w-24 h-24 mb-3 bg-gray-300 rounded-full shadow-lg "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
             {userData.username}
            </h5>
            
            <div class="flex mt-4 space-x-3 md:mt-6">
                <p className="text-gray-500">Email :</p>
                <h3>
                    {userData.email}
                </h3>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
