import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Typography, Modal, Fade } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
// import RuleIcon from "@mui/icons-material/Rule";
import Backdrop from "@mui/material/Backdrop";
import usePost from "./usePost";
import DeletePostModal from "../Components/DeletePostModal";
import AddPostModal from "../Components/AddPostModal";

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

  const {
    openModal,
    rowData,
    Posts,
    columns,
    GridRows,
    handleClose,
    OpenDeleteModal,
    handleDelete,
    openAddModal,
    setOpenAddModal,
    handleAddPost
    // Posts,
    //   openUpdateModal,
    //   GetFecthData,
    //   handleUpdate,
  } = usePost();

  //   useEffect(() => {
  //   GetFecthData();
  // }, []);

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
            onClick={() => setOpenAddModal(true)}
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
                pageSize: 7,
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
      {/*<UpdatePostModal
        isOpen={openUpdateModal}
        onClose={handleClose}
        onUpdate={handleUpdate}
        data={rowData}
        />*/}
        <AddPostModal
        isOpen={openAddModal}
        onClose={handleClose}
        onAddPost={handleAddPost}
        /> 
    </Box>
  );
};

export default Posts;
