import React, { useEffect, useContext, useState } from "react";
import AuthContext from "../../Context/AuthContext";
import Axios from "axios";
import AppDetails from "./AppDetails";

function Home() {
  let { user, baseUrl, userAuthTokens } = useContext(AuthContext);

  //to store the application list
  const [listApp, setListApp] = useState([]);
  const [details, setDetails] = useState(false);
  const [appDetails, setAppDetails] = useState([]);

  useEffect(() => {
    listApplications();
  }, []);

  //fucntion to get all the applications
  const listApplications = () => {
    try {
      Axios.get(baseUrl + "accounts/list-apps", {
        headers: {
          Authorization: `Bearer ${userAuthTokens.access}`,
          "Content-Type": "application/JSON",
        },
      })
        .then((res) => {
          setListApp(res.data);
          console.log("heeeiii", res.data);
          console.log("here is then", res.data[0]);
          console.log("set list apps", listApp);
        })
        .catch((err) => {
          console.log("here is then catch", err);
        });
    } catch (error) {
      console.log("here catch error", error);
    }
  };

  const viewAppDetails = (id) => {
    console.log("here is app id", id);
    setDetails(!details);
    try {
      Axios.get(baseUrl + "accounts/app-details/" + id, {
        headers: {
          Authorization: `Bearer ${userAuthTokens.access}`,
        },
      })
        .then((res) => {
          console.log("details resp", res.data.Response);
          setAppDetails(res.data.Response);
        })
        .catch((err) => {
          console.log("error response", err);
        });
    } catch (error) {
      console.log("error is ", error);
    }
  };

  return (
    <div>
      <div className="bg-slate-200 rounded-md h-full ring-2 ring-indigo-600 ">
        <div className="">
          <div className="   p-3 m-autorounded-md  mb-3 ">
            <div className="">
              <h1 className="text-indigo-700  text-center text-3xl font-semibold underline uppercase decoration-wavy">
                Applications
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-white  rounded-md">
          <div>
            <div className="bg-white  rounded-md">
              <>
                {!details ? (
                  listApp.map((app, index) => {
                    return (
                      <div className=" h-auto mr-5 py-3 pl-4 ">
                        <div className="bg-slate-300 text-slate-100 mt-10 px-5 py-3.5   rounded-lg shadow hover:shadow-xl  mx-auto transform hover:-translate-y-[0.125rem] transition duration-100 ease-linear">
                          <div className="flex items-center mt-2 rounded-lg py-1 cursor-pointer justify-between">
                            <div className="relative flex flex-shrink-0 items-end">
                              <img className="h-20 w-20 " src={app.app_image} />
                              <div className="ml-3.5 xl:pl-10 ">
                                <span className=" tracking-tight text-center ml font-extrabold text-zinc-900  xl:text-3xl">
                                  {app.app_name}
                                </span>
                                <span className="text-xs leading-none opacity-50"></span>
                                <p className="text-xs leading-4 pt-2 italic opacity-70 "></p>
                                <span
                                  className="font-light text-violet-600 underline leading-4 opacity-75"
                                  onClick={() => viewAppDetails(app.id)}
                                >
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
                      </div>
                    );
                  })
                ) : (
                <div>
                  <AppDetails setDetails={setDetails} appDetails={appDetails}></AppDetails>
                </div>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
