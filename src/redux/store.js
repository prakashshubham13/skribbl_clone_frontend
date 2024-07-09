import { configureStore } from "@reduxjs/toolkit";
import canvasSlice from "./canvasSlice";
import gameSlice from "./gameSlice";
import timerSlice from "./timerSlice";
import playerSlice from "./playerSlice";
import chatSlice from "./chatSlice";


const store = configureStore({
    reducer:{
        canvas: canvasSlice,
        game: gameSlice,
        timer: timerSlice,
        player: playerSlice,
        chat: chatSlice
    }
});

export default store;