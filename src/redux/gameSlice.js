import { createSlice } from '@reduxjs/toolkit';

/**
 * 
 * status:
 * 1 ready
 * 2 select
 * 3 selecting
 * 4 draw
 * 5 drawing
 * 6 wait
 * 7 end
 * 8
 * 
 */


const gameSlice = createSlice({
    name: 'game',
    initialState:{
        roomId: null,
        mssg: '',
        guessList: [],
        currentRound: 0,
        totalRound:0,
        hint:'',
        startBtnEnable: false,
        gameOn: false,
        showWaitScreen: false,
    },
    reducers:{
       updateTotalRound:(state, action)=>{
        state.totalRound = action.payload;
       },
       updateCurrentRound:(state, action)=>{
        state.currentRound = action.payload;
       },
       updateMssg:(state, action)=>{
        state.mssg = action.payload;
       },
       updateHint:(state, action)=>{
        state.hint = action.payload;
       },
       updateGuessList:(state, action)=>{
        state.guessList = action.payload;
       },
       updateReadyEnable:(state, action)=>{
        state.startBtnEnable = action.payload;
       },
       updateGameOn:(state, action)=>{
        state.gameOn = action.payload;
       },
       updateRoomId:(state,action)=>{
        state.roomId = action.payload;
       },
       updateShowWaitScreen:(state,action)=>{
        state.showWaitScreen = action.payload;
       }
    }
})

export const {updateCurrentRound,updateGuessList,updateHint,updateMssg,updateTotalRound,updateGameOn,updateReadyEnable,updateRoomId,updateShowWaitScreen} = gameSlice.actions;

export default gameSlice.reducer;