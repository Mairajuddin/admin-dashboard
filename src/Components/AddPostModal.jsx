import React,{useState ,useEffect} from 'react'
import { Box, Grid, Button, Typography, Modal, Fade } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import { AddFetchPosts } from "../store/postSlice";

import {useSelector,useDispatch} from 'react-redux'


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
const AddPostModal = ({isOpen, onClose,onAddPost}) => {

  const post = useSelector((state) => state.posts.posts);
 const dispatch = useDispatch();



    const [addPost, setAddPost] = useState({
        userId: "",
        title: "",
        body: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddPost({
            ...addPost,
            [name]: value,
        })
        console.log(addPost, "addPost");
    }
    const handleSubmit = async () => {
      // const newUserId = addPost.id.length > 0 ? Math.max(...Posts.map((row) => row.id))+1 : 1;
      const newPost={
        userId:addPost.userId,
        title:addPost.title,
        body:addPost.body,
      }
      console.log(newPost,'newPost')
      dispatch(AddFetchPosts(newPost));
      setAddPost({
        userId: "",
        title: "",
        body: "",
      })
      onClose();
     }
// useEffect(()=>{
//   handleSubmit()
// },[])
    // const handleSubmit = async () => {
    //     const url="https://jsonplaceholder.typicode.com/posts";
    //     try{
    //         const  response= await fetch(url,{
    //             method:'POST',
    //             body:JSON.stringify(addPost),
    //             headers:{
    //                 'Content-type': 'application/json; charset=UTF-8'
    //             }
    //         })
    //         if (response.ok){
    //             console.log("success");
    //             const newPost=await response.json()
    //             onAddPost(newPost);
    //             onClose();
    //         }
    //     }catch (error){
    //         console.log(error)
    //     }
      
    // }
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
        <Typography>Add Post</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              label="User ID"
              required
              fullWidth
              name="userId"
              value={addPost.userId}
              onChange={handleChange}
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
              value={addPost.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              label="Body"
              required
              fullWidth
              value={addPost.body}
              name="body"
              onChange={handleChange}
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
              Add Post
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  </Modal>
  )
}

export default AddPostModal