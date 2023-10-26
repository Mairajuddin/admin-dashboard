import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    posts:[],
    status: 'idle',
    error: null,
}

export const fetchPosts=createAsyncThunk('posts/fetchPosts',async()=>{
    const response=await fetch ('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;

})

export const DeleteFetchPosts=createAsyncThunk('posts/DeleteFetchPosts',async(postId)=>{
    console.log(postId,'postId')
    const response=await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`,{
        method:'DELETE',
        headers:{'Content-type':'application/json'}
    });
    const data=await response.json();
    return data
    })
export const AddFetchPosts=createAsyncThunk('posts/AddFetchPosts',async(newpost)=>{
    console.log(newpost,'newpost add ka data')
    const response=await fetch('https://jsonplaceholder.typicode.com/posts',{
        method:'POST',
        body:JSON.stringify(newpost),
        headers:{'Content-type':'application/json'}
    });
    const data=await response.json();
    console.log(data,'data')
    return data
    })
   

export const  UpdateFetchPosts=createAsyncThunk('posts/UpdateFetchPosts',async(post)=>{
    console.log(post,'post')
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: "PUT",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json ; charset=UTF-8",
        },
    })
    const data = await response.json();
    console.log('update ja data',data)
    return data;

})

const postSlice=createSlice({
    name:'posts',
    initialState,
    error:null,
    reducers:{},
    extraReducers:(builder)=>{

        builder.addCase(fetchPosts.pending,(state)=>{
            state.status='loading...'
        })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
            state.status='success'
            state.posts=action.payload;
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.status='failed'
            state.error=action.error.message
        })
        .addCase(DeleteFetchPosts.pending,(state)=>{
            state.status='loading...'
           
        })
        .addCase(DeleteFetchPosts.fulfilled,(state,action)=>{
            state.status='success'
            state.posts = state.posts.filter((post) => post.id !== action.meta.arg);
            console.log('it is working fine',action)
                                    
        })
        .addCase(DeleteFetchPosts.rejected,(state)=>{
            state.status='failed'
            state.error=action.error.message
        })
        .addCase(AddFetchPosts.pending,(state)=>{
             state.status='loading...'
     })
     .addCase(AddFetchPosts.fulfilled,(state,action)=>{
        console.log(action.payload,">>")
        state.posts=[action.payload,...state.posts]
        console.log('action working',action)
         state.status='success'
                 
     })
     .addCase(AddFetchPosts.rejected,(state)=>{
         state.status='failed'
         state.error=action.error.message
     })
     .addCase(UpdateFetchPosts.pending,(state)=>{
        state.status='loading...'
     })
     .addCase(UpdateFetchPosts.fulfilled,(state,action)=>{
         console.log('action working',action.payload)
        state.posts=[...state.posts,action.payload]
         state.status='success'
     }
     )

    }
})
export default postSlice.reducer
