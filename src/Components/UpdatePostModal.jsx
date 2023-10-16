import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Typography, Modal, Fade } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";

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

const UpdatePostModal = ({ onClose, isOpen, data, onUpdate }) => {
  const [formData, setFormData] = useState({});
  useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  console.log(formData, "formData");
  const handleUpdate = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(data, "user data ");

  const handleSubmit = async (formData) => {
    const url = `https://jsonplaceholder.typicode.com/posts/${formData.id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(FORMdata),
        headers: {
          "Content-Type": "application/json ; charset=UTF-8",
        },
       
      });
      if (response.ok) {
        onUpdate(formData);
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <TextField
                margin="normal"
                label="Post Id"
                name="id"
                required
                fullWidth
                value={formData.id}
                onChange={handleUpdate}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                label="Phone"
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
                onClick={handleSubmit}
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
