import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
    name:'timer',
    initialState:{
        time: 0,
        showTime: false
    },
    reducers:{
        updateTime:(state,action)=>{
            state.time = action.payload.time;
            state.showTime = action.payload.showTime;
        },
    }
});

export const { updateTime } = timerSlice.actions;

export default timerSlice.reducer;