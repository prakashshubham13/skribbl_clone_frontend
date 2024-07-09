import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name:'timer',
    initialState:{
        chatList: []
    },
    reducers:{
        updateChatList:(state,action)=>{
            state.chatList.push(action.payload);
        },
    }
});

export const { updateChatList } = chatSlice.actions;

export default chatSlice.reducer;