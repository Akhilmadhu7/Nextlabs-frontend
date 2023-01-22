import React from 'react'
import AddApps from '../../Components/Admin/AddApps'
import Header from '../../Components/Admin/Header'

function AddAppPage() {
  return (
    <div>
        <Header></Header>
        <AddApps></AddApps>
    </div>
  )
}

export default AddAppPage






// <div className="h-screen flex justify-center items-center bg-slate-300 px-2">
//                       <div className="p-3 md:w-1/2 w-[360px] rounded-md">
//                         <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">
//                           {/* {message} */}
//                         </span>
//                         <div className="h-32 w-full overflow-hidden relative shadow-md border-2 items-center rounded-md cursor-pointer   border-gray-400 border-dotted">
//                           <input
//                             type="file"
//                             // onChange={handleFile}
//                             className="h-full w-full opacity-0 z-10 absolute"
//                             multiple="multiple"
//                             name="files[]"
//                           />
//                           <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
//                             <div className="flex flex-col">
//                               <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
//                               <span className="text-[12px] text-black">{`Drag and Drop a file`}</span>
//                             </div>
//                           </div>
//                         </div>
//                         {/* <div className="flex flex-wrap gap-2 mt-2">
//                           {files.map((file, key) => {
//                             return (
//                               <div
//                                 key={key}
//                                 className="w-full h-16 flex items-center justify-between rounded p-3 bg-white"
//                               >
//                                 <div className="flex flex-row items-center gap-2">
//                                   <div className="h-12 w-12 ">
//                                     <img
//                                       className="w-full h-full rounded"
//                                       src={URL.createObjectURL(file)}
//                                     />
//                                   </div>
//                                   <span className="truncate w-44">
//                                     {file.name}
//                                   </span>
//                                 </div>
//                                 <div
//                                   onClick={() => {
//                                     removeImage(file.name);
//                                   }}
//                                   className="h-6 w-6 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm"
//                                 >
//                                   <MdDelete className=" text-white text-[14px]"></MdDelete>
//                                 </div>
//                               </div>
//                             );
//                           })}
//                           <button className="px-4 py-2 text-white bg-blue-500 rounded shadow-xl ">
//                             Submit
//                           </button>
//                         </div> */}
//                       </div>
//                     </div>