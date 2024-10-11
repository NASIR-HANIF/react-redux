import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading : null,
    data : null,
    error : null
}

const postSlice = createSlice({
    name : "post",
    initialState,
    reducers : {
        setLoading(state,action){
            state.loading = action.payload
        },
        setData(state,action){
            state.data = action.payload
        },
        setError(state,action){
            state.error = action.payload
        },
    }

    // meanul rule
    // reducers : {
    //     setPost(state,action){
    //         state.loading = true;
    //         state.data = action.payload;
    //         state.error = null
    //     }
    // }
})

export const  {setLoading,setData,setError} = postSlice.actions;
export default postSlice.reducer;


//ye role bhi follow ker saktey hen
// axios use kearney pe response me data miley ga wo data ho ya error
export const getPost = ()=>{
    return async (dispatch)=>{
            try {
                dispatch(setLoading(true))
                const {data} = await axios({
                    method : "get",
                    url : "https://jsonplaceholder.typicode.com/posts"
                });

                dispatch(setLoading(false));
                dispatch(setData(data));
            } catch (error) {
                dispatch(setLoading(false));
                dispatch(setError(error.response.data));
               // console.log(error.response.data)
            }
    }
}




    /*
ye role bhi follow ker saktey hen
export const getPost = ()=>(dispatch)=>{

}

*/