import React, { createContext, useRef, useState } from "react";

export const CanvasContext = createContext(null);

const CanvasProvider = ({ children }) => {
  const boardRef = useRef(null);
  const shouldDrawRef = useRef(false);
  const tempCanvas = useRef([]);
  const canvasStack = useRef([]);
  const [enableCanvas,setEnabledCanvas] = useState(false);

  const getBoardRef = () => boardRef;
  const getShouldDrawRef = () => shouldDrawRef;
  const getTempCanvas = () => tempCanvas;
  const getCanvasStack = () => canvasStack;

  const toggleEnabledCanvas = (data) => {
    console.log("canvas enable",data);
    setEnabledCanvas(data);
  }


  const toggleShouldRef = (data) => {
    shouldDrawRef.current = data;
  };

  const pushTempCanvas = (data) => {
    tempCanvas.current.push(data);
  };

  const popTempCanvas = () => {
    tempCanvas.current.pop();
  };

  const emptyTempCanvas = () => {
    tempCanvas.current = [];
  };

  const pushCanvasStack = (data) => {
    tempCanvas.current.push(data);
  };

  const popCanvasStack = () => {
    tempCanvas.current.pop();
  };

  const emptyCanvasStack = () => {
    tempCanvas.current = [];
  };

  const [brushColor, changeBrushColor] = useState({
    label: "ORANGE",
    value: "orange",
  });
  const [brushSize, changeBrushSize] = useState(3);
  const updateBrushColor = (color) => {
    changeBrushColor(color);
  };
  const updateBrushSize = (size) => {
    changeBrushSize(size);
  };
  return (
    <CanvasContext.Provider
      value={{
        brushColor,
        updateBrushColor,
        brushSize,
        updateBrushSize,
        getBoardRef,
        getShouldDrawRef,
        getTempCanvas,
        getCanvasStack,
        enableCanvas,
        toggleEnabledCanvas,
        toggleShouldRef,
        emptyCanvasStack,
        emptyTempCanvas,
        pushCanvasStack,
        pushTempCanvas,
        popCanvasStack,
        popTempCanvas,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasProvider;