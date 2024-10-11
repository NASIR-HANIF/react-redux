import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading : null,
    error : null,
    data : null

}

/*
// jab hum createAsyncThunk use karen gey to extraReducers use kearna ho ga or initialState use kearna ho ga
const productsSlice = createSlice({
    name : "products",
    initialState,
    extraReducers : (res)=>{
        // request honey se pehley ki state
            res.addCase(getProducts.pending,(state)=>{
                state.loading = true;
            }).addCase(getProducts.fulfilled,(state, action)=>{
                state.loading = false;
                state.data = action.payload
            }).addCase(getProducts.rejected,(state,action)=>{
                state.loading = false;
                state.data = null;
                state.error = action.payload
            })
    }
})

export default productsSlice.reducer


// createAsyncThunk me error ko return kearna zarori hey

export const getProducts = createAsyncThunk("getProducts", async ()=>{
    try {
        const {data} = await axios({
            method : "get",
            url : "https://fakestoreapi.com/products",
        });

        return data
    } catch (error) {
        // axios use kearney ke case me error me response me data miley ga error ka
        return error.response.data
    }
})


*/

//========================================================



// action with outcreateAsyncThunk

const productsSlice = createSlice({
    name : "products",
    initialState,
    reducers :{
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
})

export const {
    setData,
    setError,
    setLoading
} = productsSlice.actions;
export default productsSlice.reducer;

export const getProducts =  ()=> async(dispatch)=>{

        try {
            dispatch(setLoading(true))
            const {data} = await axios({
                method : "get",
                url : "https://fakestoreapi.com/products",
            });

            dispatch(setLoading(false));
            dispatch(setData(data))
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(setError(error.response.data));
        }
}

