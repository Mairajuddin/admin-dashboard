import { useEffect, useState } from "react";

const useUpdatePostModal=(onUpdate,onClose)=>{
    const [formData, setFormData] = useState({});
  
  const handleUpdate = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async () => {
    
    const url = `https://jsonplaceholder.typicode.com/posts/${formData.id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json ; charset=UTF-8",
        },
       
      });
      if (response.ok) {
        onUpdate(formData);
        console.log ("success");
        onClose();

        setRows((prevRows) =>
          prevRows.map((row) => {
            if (row.id === formData.id) {
              return rowData;
            }
            return row;
          })
        );
      } else {
        console.log("failed to update");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

    return{
        formData, 
        setFormData,
        handleUpdate,
        handleSubmit,
        
            }
}
export default useUpdatePostModal