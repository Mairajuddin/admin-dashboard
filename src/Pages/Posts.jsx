import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Typography, Modal, Fade } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import RuleIcon from "@mui/icons-material/Rule";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ContactPageSharp, DeleteOutline } from "@mui/icons-material";
import Backdrop from "@mui/material/Backdrop";
import DeletePostModal from "../Components/DeletePostModal";
import UpdatePostModal from "../Components/UpdatePostModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ViewModal = ({ isOpen, onClose, data }) => {
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
          <Box noValidate sx={style}>
            <Typography>Post Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  label="User ID"
                  required
                  fullWidth
                  value={data.userId}
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  label="Post Id"
                  required
                  fullWidth
                  value={data.id}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  label="Phone"
                  required
                  fullWidth
                  multiline
                  value={data.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Body"
                  required
                  fullWidth
                  value={data.body}
                  multiline
                  maxRows={4}
                />
              </Grid>
              <Grid item xs={12}></Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  style={{ width: "100%" }}
                  onClick={() => onClose()}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

const Posts = () => {
  const [Rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const[openUpdateModal,setOpenUpdateModal]=useState(false)
  

  const columns = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 70 },
    { field: "userId", headerName: "User ID", flex: 1 },
    { field: "title", headerName: "Title", flex: 2, minWidth: 170 },
    { field: "body", headerName: "Body", flex: 2 },
    {
      field: "action",
      headerName: "Actions",
      flex: 2,
      renderCell: (params) => (
        <div>
          <VisibilityOutlinedIcon
            style={{ cursor: "pointer", marginRight: "20px" }}
            onClick={() => handleView(params.row)}
          />
          <RuleIcon style={{ cursor: "pointer", marginRight: "20px" }}
          onClick={() => {
            setRowData(params.row);
            setOpenUpdateModal(true);
          }}
          />
          <DeleteOutline
            style={{ cursor: "pointer" }}
            onClick={() => {
              setRowData(params.row);
              setOpenDeleteModal(true);
            }}
          />
        </div>
      ),
    },
  ];
  const GetFecthData = async () => {
    const url = "https://jsonplaceholder.typicode.com/posts";
    try {
      const response = await fetch(url, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data, "post data here");
      setRows(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetFecthData();
  }, []);

  const GridRows = Rows.map((row) => ({
    id: row.id,
    userId: row.userId,
    title: row.title,
    body: row.body,
  }));

  const handleView = (row) => {
    setOpenModal(true);
    setRowData(row);
  };
  const handleClose = () => {
    setOpenModal(false);
    setOpenDeleteModal(false);
    setOpenUpdateModal(false);
  };
  const handleDelete = async () => {
    const url = `https://jsonplaceholder.typicode.com/posts/${rowData.id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setRows((prevRows) =>
          prevRows.filter((row) => row.id !== rowData.id)
        );
        setRows((prevRows) =>
          prevRows.map((row, index) => ({
            ...row,
            id: index + 1,
          }))
        );
        setOpenDeleteModal(false);
      } else {
        console.log("failed to delete");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = (updatedData) => {
    // Update the rows in your state
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === updatedData.id ? updatedData : row))
    );
  };
  // const handleUpdate= async ()=>{
  //   const url  =`https://jsonplaceholder.typicode.com/posts/${rowData.id}`
  //   try{
  //     const response= await fetch (url,{
  //       method:'PUT',
  //       headers:{
  //         'Content-Type':'application/json ; charset=UTF-8',
  //       },
  //       body:JSON.stringify({
  //         id:rowData.id,
  //         title:rowData.title,
  //         body:rowData.body,
  //         userId:rowData.userId
  //       }),
  //    })
  //    if (response.ok){
  //     console.log('its working success')
  //     rowData.userID=response.data.userId;
  //     rowData.title=response.data.title;
  //     rowData.body=response.data.body;
  //     console.log('success')
  //     handleClose()

  //     setRows((prevRows)=>prevRows.map((row,index)=>{
  //       if(row.id===rowData.id){
  //         return rowData
  //       }
  //       return row;
  //     }))


  //    } else{
  //     console.log('failed to update')
  //    }

  //   }catch(error){
  //     console.log('error',error)

  //   }
  // }

  return (
    <Box style={{ padding: "20px" }}>
      <Grid container spacing={2} style={{ padding: "20px" }}>
        <Grid item xs={8}>
          <Typography variant="h5" style={{ float: "left" }}>
            Posts
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            style={{ float: "right", marginRight: "20px" }}
          >
            Add User
          </Button>
        </Grid>
      </Grid>
      <Box>
        <DataGrid
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          rows={GridRows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          // getRowHeight={() => 'auto'}
        />
      </Box>
      <ViewModal
        isOpen={openModal}
        dataView={rowData}
        data={rowData}
        onClose={handleClose}
      />
      <DeletePostModal
        isOpen={OpenDeleteModal}
        onClose={handleClose}
        onDelete={handleDelete}
        data={rowData}
      />
      <UpdatePostModal
        isOpen={openUpdateModal}
        onClose={handleClose}
        onUpdate={handleUpdate}
        data={rowData}
        />
    </Box>
  );
};

export default Posts;
