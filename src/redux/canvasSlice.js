import { createSlice } from '@reduxjs/toolkit'

const canvasSlice = createSlice({
    name:'canvas',
    initialState:{
        color:{
            label: 'ORANGE',
            value: 'orange'
          },
        currectTool:"draw",
        size:1,
        shouldDraw: false,
    },
    reducers:{
        changeColor:(state,action)=>{
            state.color = action.payload;
        },
        changeSize:(state,action)=>{
            state.size = action.payload;
        },
    }
})

export const {changeColor, changeSize} = canvasSlice.actions;

export default canvasSlice.reducer;