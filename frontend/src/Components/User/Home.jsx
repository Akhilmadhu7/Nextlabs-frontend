import React,{useEffect,useContext,useState} from "react";
import AuthContext from "../../Context/AuthContext";
import Axios from "axios";

function Home() {
  let {user,baseUrl,userAuthTokens} = useContext(AuthContext)

  //to store the application list
  const [listApp,setListApp] = useState([])

  useEffect(()=>{
    listApplications()
  },[])

  //fucntion to get all the applications
  const listApplications = ()=>{

    try {
      Axios.get(baseUrl+'accounts/list-apps',{
        headers:{
          Authorization:`Bearer ${userAuthTokens.access}`,
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
            <div className="bg-white  rounded-md">
              <>
                {/* {!view ?
          
          data.map((list, id) => {
            return ( */}
            {listApp.map((app, index)=>{
              return(

              
                <div className=" h-auto mr-5 py-3 pl-4 ">
                  <div className="bg-slate-300 text-slate-100 mt-10 px-5 py-3.5   rounded-lg shadow hover:shadow-xl  mx-auto transform hover:-translate-y-[0.125rem] transition duration-100 ease-linear">
                    <div className="flex items-center mt-2 rounded-lg py-1 cursor-pointer justify-between">
                      <div className="relative flex flex-shrink-0 items-end">
                        <img className="h-20 w-20 " src={app.app_image}/>
                        <div className="ml-3.5 xl:pl-10 ">
                          <span className=" tracking-tight text-center ml font-extrabold text-zinc-900  xl:text-3xl">{app.app_name}</span>
                          <span className="text-xs leading-none opacity-50"></span>
                          <p className="text-xs leading-4 pt-2 italic opacity-70 "></p>
                          <span className="font-light text-violet-600 underline leading-4 opacity-75">
                            tap to view details
                          </span>
                        </div>
                      </div>
                      <div className=" ml-3.5 xl:pl-72 w-full  ">
                        <button className="px-4 py-2 text-black bg-teal-500 rounded shadow-xl ">
                          {app.app_points}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>)
            })}
                {/* )
            })
                : */}

                {/* <div className=" h-auto mr-5 ">
                  <div className="bg-gray-600 text-slate-100 mt-10 px-5 py-3.5   rounded-lg shadow hover:shadow-xl  mx-auto transform hover:-translate-y-[0.125rem] transition duration-100 ease-linear">
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={details}
                    >
                      back
                    </span>
                    <div className="flex items-center mt-2 rounded-lg py-1 cursor-pointer">
                      <div className="relative flex flex-shrink-0 items-end">
                        <img
                          className="h-20 w-20 "
                          src={preloaddata.Appimagelink}
                        />
                      </div>
                      <div className="ml-3.5 xl:pl-10 ">
                        <span className=" tracking-tight text-center ml font-extrabold text-zinc-900  xl:text-3xl">
                          {preloaddata.Appname}
                        </span>
                        <span className="text-xs leading-none opacity-50"></span>
                        <p className="text-xs leading-4 pt-2 italic opacity-70 "></p>
                        <a
                          href={preloaddata.Applink}
                          className="font-light text-blue-500  leading-4 opacity-75"
                        >
                          {preloaddata.Applink}
                        </a>
                      </div>
                      <div className=" ml-3.5 xl:pl-72 w-full  ">
                        <button className="px-4 py-2 text-white bg-blue-500 rounded shadow-xl">
                          {preloaddata.points}
                        </button>
                      </div>
                    </div>

                    <div className="h-screen flex justify-center items-center bg-gray-900 px-2">
                      <div className="p-3 md:w-1/2 w-[360px] rounded-md">
                        <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">
                          {message}
                        </span>
                        <div className="h-32 w-full overflow-hidden relative shadow-md border-2 items-center rounded-md cursor-pointer   border-gray-400 border-dotted">
                          <input
                            type="file"
                            onChange={handleFile}
                            className="h-full w-full opacity-0 z-10 absolute"
                            multiple="multiple"
                            name="files[]"
                          />
                          <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
                            <div className="flex flex-col">
                              <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
                              <span className="text-[12px] text-black">{`Drag and Drop a file`}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {files.map((file, key) => {
                            return (
                              <div
                                key={key}
                                className="w-full h-16 flex items-center justify-between rounded p-3 bg-white"
                              >
                                <div className="flex flex-row items-center gap-2">
                                  <div className="h-12 w-12 ">
                                    <img
                                      className="w-full h-full rounded"
                                      src={URL.createObjectURL(file)}
                                    />
                                  </div>
                                  <span className="truncate w-44">
                                    {file.name}
                                  </span>
                                </div>
                                <div
                                  onClick={() => {
                                    removeImage(file.name);
                                  }}
                                  className="h-6 w-6 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm"
                                >
                                  <MdDelete className=" text-white text-[14px]"></MdDelete>
                                </div>
                              </div>
                            );
                          })}
                          <button className="px-4 py-2 text-white bg-blue-500 rounded shadow-xl ">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* } */}
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
