import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
    name:'player',
    initialState:{
        playerList: []
    },
    reducers:{
        updatePlayer:(state,action)=>{
            state.playerList = action.payload;
        },
    }
});

export const { updatePlayer } = playerSlice.actions;

export default playerSlice.reducer;