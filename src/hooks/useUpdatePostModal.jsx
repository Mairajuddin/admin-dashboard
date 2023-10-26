import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateFetchPosts } from "../store/postSlice";
const useUpdatePostModal=(onUpdate,onClose)=>{
  // console.log('rowdata ',Rows)
  const dispatch=useDispatch()
    const [formData, setFormData] = useState({});
  
  const handleUpdate = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // console.log(formData,"formData")
const handleSubmit=async (formData)=>{
  onUpdate(formData);
  // console.log(formData,"formData")
try{
 dispatch(UpdateFetchPosts(formData));
onClose();

      
}catch(error){
  console.log(error)
}


}

  // const handleSubmit = async () => {
    
  //   const url = `https://jsonplaceholder.typicode.com/posts/${formData.id}`;
  //   try {
  //     const response = await fetch(url, {
  //       method: "PUT",
  //       body: JSON.stringify(formData),
  //       headers: {
  //         "Content-Type": "application/json ; charset=UTF-8",
  //       },
       
  //     });
  //     if (response.ok) {
  //       onUpdate(formData);

  //       onClose();

  //       setRows((prevRows) =>
  //         prevRows.map((row) => {
  //           if (row.id === formData.id) {
  //             return rowData;
  //           }
  //       console.log ("success working update");

  //           return row;
  //         })
          
  //       );
  //     } else {
  //       console.log("failed to update");
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  

    return{
        formData, 
        setFormData,
        handleUpdate,
        handleSubmit,
        
            }
}
export default useUpdatePostModal