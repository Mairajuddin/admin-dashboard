import React,{useEffect,useState} from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import RuleIcon from '@mui/icons-material/Rule';
import { Icon } from '@iconify/react';
import Modal from '@mui/material/Modal';
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { Typography ,Grid} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const ModalDelete = ({ isOpen, onClose,data,handleRemoveClick}) => {
  if (!data) {
      return null; 
    }
    const handleAccept=()=>{
      console.log(data,'accept')
      // updateStatus('Yes')
     handleRemoveClick(data)
      onClose()
    }
    const handleReject=()=>{
      // updateStatus('No')
     
      onClose()}

return (
  <div>
      <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
     <Fade in={isOpen}>
        <Box sx={style}>
          <Typography id="transition-modal-title" component="h2">
            Make sure before deleting user <Typography sx={{ color: 'red' }}>{data.name}</Typography>        </Typography>
          <br/>
          <br/>
          {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}>{data.name}</Typography> */}
          <Grid container spacing={2}>
            <Grid item xs={6} onClick={handleAccept} sx={{ p: 1 ,backgroundColor: '#9EB384', textAlign: 'center',cursor: 'pointer'}} >
             <DoneIcon/>

            </Grid>
            <Grid item xs={6} onClick={handleReject}  sx={{ p: 1 ,backgroundColor: '#FF6969',textAlign: 'center',cursor: 'pointer'}} >
              <CloseIcon/>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  </div>
)
}

const UsersPages = () => {
  const [Rows, setRows] = useState([])
  const [deletSelectedRow, setDeletSelectedRow] = useState([])
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

    
  const columns = [
    {field : 'id', headerName:'ID', flex : -10, },
    {field:'profile',headerName:'Profile',flex : -7 ,renderCell: (params) =>(
      <Icon icon="mdi:account-circle" width="29" height="29" />)},
    {field: 'name',headerName:'Name',flex : 1, },
    {field:'age',headerName:'Age',flex : 1, },
    {field:'phone',headerName:'Phone',flex : 1,},
    {field:'city',headerName:'City',flex : 1, },
    {field:'country',headerName:'Country',flex : 1, },
     { field: 'remove', headerName: 'Actions', flex: 1, width: 80, renderCell: (params) => (
        <div style={{ display: 'flex' , alignItems: 'center' ,justifyContent: 'space-around'}}>
          <RuleIcon style={{ cursor: 'pointer', marginRight: '20px' }} />
          <DeleteOutline 
            style={{ cursor: 'pointer' }} 
            onClick={() => {
              setDeletSelectedRow(params.row);
              setOpen(true);
            }}
          />
        </div>
      )},]
  
  const fetchRows=async ()=>{
    const url='https://6512788fb8c6ce52b395a801.mockapi.io/users';
    try{
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
  
  const handleRemoveClick=(row)=>{
    console.log(row,'row')
    const updatedRow=Rows.filter((item)=>item.id!==row.id)
    setRows(updatedRow.map((row, index) => ({ ...row, id: index + 1 })))   

    
}

  return (
    <Box sx={{ height: 550, width: '100%' }}>
    <DataGrid
      rows={GridRows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 11,
          },
        },
      }}
      checkboxSelection
      disableRowSelectionOnClick
    />
      <ModalDelete data={deletSelectedRow} isOpen={open} onClose={handleClose} 
    handleRemoveClick={handleRemoveClick}/>
</Box>
  )
}

export default UsersPages




