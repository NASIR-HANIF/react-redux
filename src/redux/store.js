
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";
import imagesSlice from "./slices/images.slice";
import authSlice from './slices/auth.slice';
import rememerSlice from "./slices/remember.slice"
import postSlice from "./slices/post.slice";
import productsSlice from "./slices/products.slice";
import cartSlice from "./slices/cart.slice"


// config me blacklist  is array me wo slice name dena hey jis ka data 
// localstorage me store nahi kearwana hey

const config = {
    key: "root",
    version: 1,
    storage: storage,
    blacklist : ['postSlice','productsSlice']  
}

const slices = combineReducers({
    imagesSlice: imagesSlice,
    authSlice: authSlice,
    rememerSlice : rememerSlice,
    postSlice : postSlice,
    productsSlice : productsSlice,
    cartSlice : cartSlice

})

const store = configureStore({
    reducer: persistReducer(config, slices),
    devTools: true,
    middleware: (setup) => setup({
        serializableCheck: false
    })
})

export default store;

