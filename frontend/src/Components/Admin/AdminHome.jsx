import React ,{useContext,useEffect,useState}from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import AuthContext from "../../Context/AuthContext";
import Swal from "sweetalert2";

function AdminHome() {

  let {admin,baseUrl,authTokens} = useContext(AuthContext)
  const [listApp,setListApp] = useState([])

  useEffect(()=>{
  listApplications()    

  },[])
  
  //to get and list all the apps
  const listApplications = ()=>{

    try {
      Axios.get(baseUrl+'accounts/list-apps',{
        headers:{
          Authorization:`Bearer ${authTokens.access}`,
          'Content-Type':'application/JSON'
        }
      }).then((res)=>{
        setListApp(res.data)
        console.log('heeeiii',res.data);
        console.log('here is then',res.data[0]);
        console.log('set list apps',listApp);
      }).catch((err)=>{
        console.log('here is then catch',err);
      })
    } catch (error) {
      console.log('here catch error',error);
    }

  }

 
  //for deleting an app
  const deleteApp = (id)=>{

    Swal.fire({
      title: "Confirm!",
      text: "Do you want to delete ?",
      icon: "info",
      confirmButtonText: "Continue",
      showCancelButton: true,
  }).then(res =>{
      if (res.isConfirmed) {
    
    try {
      Axios.delete(baseUrl+'accounts/delete-app/'+id,{
        headers:{
          Authorization:`Bearer ${authTokens.access}`
        }
      }).then((res)=>{
        console.log('resp',res);
        listApplications()
        Swal.fire("Success","Deleted succesfully")
      })
    } catch (error) {
      
    }
  }})
  }
  

  

  return (
    <div>
      <div className="bg-slate-200 rounded-md h-full ring-2 ring-indigo-600 ">
        <div className="">
          <div className="   p-3 m-autorounded-md  mb-3 ">
            <div className="">
              <h1 className="text-indigo-700  text-center text-3xl font-semibold underline uppercase decoration-wavy">
                Over View
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md">
          <div>
            <div className="bg-gray-100  rounded-md">
              <table class="min-w-full border-collapse block md:table">
                <thead class="block md:table-header-group">
                  <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Sl.No
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      App Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Creator Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Image
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Points
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="block md:table-row-group">
                  {listApp.map((apps,index)=>{
                    return(

                    
                  <tr class="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
                    <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                      <span class="inline-block w-1/3 md:hidden font-bold">
                        Sl.NO
                      </span>
                      {index+1}
                    </td>
                    <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                      <span class="inline-block w-1/3 md:hidden font-bold">
                        App Name
                      </span>
                      {apps.app_name}
                    </td>
                    <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                      <span class="inline-block w-1/3 md:hidden font-bold">
                      Creator Name
                      </span>
                      {apps.created_user}
                    </td>
                    <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                      <span class="inline-block w-1/3 md:hidden font-bold">
                      Image
                      </span>
                      <img
                        src={apps.app_image}
                        className="rounded-full w-8 sm:w-16  m-2 "
                        alt="Avatar"
                      />
                    </td>
                    <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                      <span class="inline-block w-1/3 md:hidden font-bold">
                      Points
                      </span>
                      {apps.app_points}
                    </td>
                    <td class="p-2 md:border md:border-grey-500 rounded text-left block md:table-cell">
                      <span class="inline-block w-1/3 md:hidden font-bold">
                        Actions
                      </span>
                      
                      <button onClick={()=>deleteApp(apps.id)} class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                   ) 
                })} 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
