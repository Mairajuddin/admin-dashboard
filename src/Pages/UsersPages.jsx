import React,{useEffect,useState} from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';



const UsersPages = () => {
  const [Rows, setRows] = useState([])
    
  const columns = [
    {field : 'id', headerName:'ID', flex : 1, },
    {field: 'name',headerName:'Name',flex : 1, },
    {field:'age',headerName:'Age',flex : 1, },
    {field:'phone',headerName:'Phone',flex : 1,},
    {field:'city',headerName:'City',flex : 1, },
    {field:'country',headerName:'Country',flex : 1, },
    { field: 'status', headerName: 'Status', flex: 1,  renderCell: (params) => (
        <Backdrop />
      ) },
      { field: 'remove', headerName: 'Remove', flex: 1, width: 80, renderCell: (params) => (
        <Backdrop 
        onClick={() =>{
            setDeletSelectedRow(params.row)
            setOpen(true)}
        }
        />
      )},]
  
  const fetchRows=async ()=>{
    try{
      const url='https://6512788fb8c6ce52b395a801.mockapi.io/users';
      const response=await fetch(url,{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        }
       })
       const data = await response.json();
       console.log(data,'user data here');
       setRows(data)
     }catch (error){
      console.log(error)
  
     }
  }

   useEffect(()=>{
    fetchRows()
  },[])
  const GridRows=Rows.map((row)=>({
    id: row.id,
    name: row.name,
    age: row.age, 
    phone: row.phone,
    city: row.city,
    country: row.country,
    status: row.status
  }));
 

  return (
    <Box sx={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={GridRows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  </Box>
  )
}

export default UsersPages




