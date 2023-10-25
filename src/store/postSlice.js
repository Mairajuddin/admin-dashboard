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
    const response=await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`,{
        method:'DELETE',
        headers:{'Content-type':'application/json'}
    });
    const data=await response.json();
    return data
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
        .addCase(fetchPosts.rejected,(state)=>{
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

    }
})
export default postSlice.reducer