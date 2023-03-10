import React, { useState } from "react";
import { useForm } from "react-hook-form";

function AddImage({ getImage,imgError }) {

  const [imgPreview, setImgPreview] = useState({
    app_image:''
  }); //to show the image preview.

  //for validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log('type of ',typeof(imgPreview));
  const handlePostImage = (e) => {
    console.log('heere it works',e.target.files[0]);
    setImgPreview({
      ...imgPreview,
      app_image: e.target.files[0],
    });
    setImgPreview(URL.createObjectURL(e.target.files[0])); //for image preview
    
    getImage(e.target.files[0]) //passing the image file to add app component
  };

  //remove image
  const removeImage = ()=>{
    setImgPreview({
      app_image:''
    })
  }

  return (
    <div>
      <div className="flex justify-center mt-8">
        <div className="rounded-lg shadow-xl bg-gray-50 lg:w-1/2 ">
          <div className="m-4">
            <label className="inline-block mb-2 text-gray-500">
            <small className="text-red-600">{imgError}</small>
              
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                    {imgPreview.app_image !== '' ? (
                        <img src={imgPreview} className="w-36 h-24 text-gray-400 group-hover:text-gray-600"
                         alt="post image" />
                    ):(
                
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
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    
                  </p>
                  </svg>
                  
                    )}
                </div>
                <input
                  onChange={handlePostImage}
                  name="app_image"
                  type="file"
                  className="opacity-0"
                />
              </label>
            </div>
          </div>
          <div className="flex p-2 space-x-4">
            <button onClick={removeImage} className="px-4 py-2 text-white bg-red-500 rounded shadow-xl">
              Cannel
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddImage;
