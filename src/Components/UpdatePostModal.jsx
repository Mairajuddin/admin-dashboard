import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Typography, Modal, Fade } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import useUpdatePostModal from "../hooks/useUpdatePostModal";

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

const UpdatePostModal = ({ onClose, isOpen, data, onUpdate, }) => {
  useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  const {handleUpdate,handleSubmit,formData,setFormData,}=useUpdatePostModal(onUpdate,onClose,data)
  
  

  return (
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
          <Typography>Update post Info.</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                label="User ID"
                required
                fullWidth
                name="userId"
                value={formData.userId}
                onChange={handleUpdate}
                autoFocus
              />
            </Grid>
         <Grid item xs={12}>
              <TextField
                margin="normal"
                label="Title"
                required
                fullWidth
                multiline
                name="title"
                value={formData.title}
                onChange={handleUpdate}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                label="Body"
                required
                fullWidth
                value={formData.body}
                name="body"
                onChange={handleUpdate}
                multiline
                maxRows={4}
              />
            </Grid>
            <Grid item xs={12}></Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                style={{ width: "100%" }}
                onClick={()=>handleSubmit(formData)}
              >
                Update..
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UpdatePostModal;
