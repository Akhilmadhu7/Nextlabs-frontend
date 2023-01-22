import React, { useContext, useState } from "react";
import Axios from "axios";
import { MdDelete } from "react-icons/md";
import AuthContext from "../../Context/AuthContext";
import Swal from "sweetalert2";

function AppDetails({ setDetails, appDetails }) {
  let { userAuthTokens, user, baseUrl } = useContext(AuthContext);
  const [taskError, setTaskError] = useState([]);
  const [taskImage, setTaskImage] = useState({
    task_image: "",
  });

  //to set image and to show image preview
  const handleImage = (e) => {
    console.log("heere it works", e.target.files[0]);
    setTaskImage({
      ...taskImage,
      task_image: e.target.files[0],
    });
    setTaskImage(URL.createObjectURL(e.target.files[0]));
  };

  //to remove image
  const removeImage = () => {
    console.log("works well");
    setTaskImage({
      task_image: "",
    });
  };

  //to update the task is completed
  const uploadTask = () => {
    if (taskImage.task_image === "") {
      console.log("hello");
      Swal.fire("Error", "Image is required");
    } else {
      try {
        Axios.post(
          baseUrl + "accounts/task-complete",
          {
            application: appDetails.id,
            user: user.user_id,
            task_image: taskImage.task_image,
          },
          {
            headers: {
              Authorization: `Bearer ${userAuthTokens.access}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
          .then((res) => {
            console.log("status", res.status);
            console.log("response", res);
            if (res.status === 208) {
              console.log("errorhhhhhh is ", res);
              console.log("errorhhhhhh is ", res.data.Response);
              setTaskError(res.data.Response);
            } else {
              console.log("elese");
              setDetails(false);
            }
          })
          .catch((err) => {
            console.log("erro catchr is ", err);
          });
      } catch (error) {
        console.log("erroe", error);
      }
    }
  };

  return (
    <div className="bg-white  rounded-md pt-4">
      <div className="  md:ml-0 h-fit p-4 ">
        <div className="bg-gray-200 text-slate-100 mt-10 px-5 py-3.5   rounded-lg shadow hover:shadow-xl   transform hover:-translate-y-[0.125rem] transition duration-100 ease-linear">
          <p className="text-red-500">{taskError}</p>
          <div className="flex items-center mt-2 rounded-lg py-1 cursor-pointer">
            <div className="relative flex flex-shrink-0 items-end">
              <img className="h-32 w-36 " src={appDetails.app_image} />
              <div>
                <div className=" mx-5 mb-4">
                  <span className=" tracking-tight text-center ml font-extrabold text-black xl:text-3xl">
                    {appDetails.app_name}
                  </span>
                </div>
                <div className=" mx-4 mb-2">
                  <a
                    href={appDetails.app_link}
                    target="_blank"
                    className="font-light text-violet-600 underline  leading-4 opacity-75"
                  >
                    {appDetails.app_name}
                  </a>
                </div>
              </div>
            </div>
            <div className="ml-3.5 xl:pl-10 ">
              <span className="text-xs leading-none opacity-50"></span>
              <div className=" ml-3.5 xl:pl-72 w-fit md:pl-[185px]  ">
                <button className="px-2 py-2 text-white bg-teal-500  rounded shadow-xl">
                  {appDetails.app_points}
                </button>
              </div>
              <p className="text-xs leading-4 pt-2 italic opacity-70 "></p>
            </div>
          </div>

          <div className="h-fit flex justify-center items-center bg-white px-2 mt-5">
            <div className="p-3 md:w-1/2 w-[360px] rounded-md">
              <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500"></span>
              <div className="h-32 w-full overflow-hidden relative shadow-md border-2 items-center rounded-md cursor-pointer   border-gray-400 border-dotted">
                <input
                  type="file"
                  onChange={handleImage}
                  className="h-full w-full opacity-0 z-10 absolute"
                  multiple="multiple"
                  name="task_image"
                />
                <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
                  <div className="flex flex-col">
                    <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
                    <span className="text-[12px] text-black">{`Drag and Drop a file`}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="w-full h-16 flex items-center justify-between rounded p-3 bg-white">
                  <div className="flex flex-row items-center gap-2">
                    <div className="h-12 w-12 ">
                      {taskImage.task_image !== "" ? (
                        <img
                          className="w-full h-full rounded"
                          src={taskImage}
                        />
                      ) : (
                        <svg
                          xmlns="https://www.w3.org/2000/svg"
                          className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clip-rule="evenodd"
                          />
                          <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600"></p>
                        </svg>
                      )}
                    </div>
                    <span className="truncate w-44"></span>
                  </div>
                  <div
                    onClick={removeImage}
                    className="h-6 w-6 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm"
                  >
                    <MdDelete className=" text-white text-[14px]"></MdDelete>
                  </div>
                </div>

                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded shadow-xl "
                  onClick={uploadTask}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="p-5">
            <span
              className="text-blue-500 cursor-pointer "
              onClick={() => setDetails(false)}
            >
              back
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppDetails;
