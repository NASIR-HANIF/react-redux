import { createSlice } from "@reduxjs/toolkit";

// roll 2 states updates

const initialState =  {
    checked: false,
    email: "",
    password: ""
}

const rememberSlice = createSlice({
    name: 'remember',
    initialState: initialState,// states outer asign
    reducers: {
        setRemember(state, action) {

            //state update roll no 1

            // state.checked = true;
            // state.email = action.payload.email;
            // state.password = action.payload.password;


            // short roll states update roll no 2
            return state ={
                ...action.payload,
                checked : true
            }
        },
        eraseRemember(state){
            /*
            roll no 1 menur state update
            state.checked = false;
            state.email = "";
            state.password = "";
            */

            // roll 2 short hand state updates
            return state = initialState
        }
    }
});

export const {setRemember, eraseRemember} = rememberSlice.actions;
export default rememberSlice.reducer;
