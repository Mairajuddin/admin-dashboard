import { Box, Fade, Grid, Modal, Typography } from '@mui/material'
import React from 'react'
import Backdrop from "@mui/material/Backdrop";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

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
const DeletePostModal = ({isOpen, onClose,onDelete,data}) => {

 const  handleAccept=()=>{
    onDelete();
    onClose();
  }
 const  handleReject=()=>{
    onClose()
  }
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
    <Box   noValidate sx={style}>
        <Typography>Make sure before deleting user who holds User Id number :  <span sx={{ fontColor: 'red' }}>#{data.userId}</span></Typography>
        <br/><br/>
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
  )
}

export default DeletePostModal  