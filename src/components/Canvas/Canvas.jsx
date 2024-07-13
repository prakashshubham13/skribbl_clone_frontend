import React, { forwardRef, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColorPallete from "../Toolbar/ColorPallete";
import ToolsPallete from "../Toolbar/ToolsPallete";
import { CanvasContext } from "../../utils/canvas/CanvasProvider";
import GameConsole from "./GameConsole";
import { Theme } from "../../utils/theme/ThemeContext";
import styles from './Canvas.module.css'
const Board = ({ undo, clear, redraw }) => {
  const dispatch = useDispatch();
  const {
    brushColor,
    updateBrushColor,
    brushSize,
    updateBrushSize,
    getBoardRef,
    getShouldDrawRef,
    getTempCanvas,
    getCanvasStack,
    enableCanvas,
    toggleShouldRef,
    emptyCanvasStack,
    emptyTempCanvas,
    pushCanvasStack,
    pushTempCanvas,
    popCanvasStack,
    popTempCanvas,
  } = useContext(CanvasContext);

  const {socket} = useContext(Theme);

  const boardRef = getBoardRef();
  const shouldDrawRef = getShouldDrawRef();
  const tempCanvas = getTempCanvas();
  const canvasStack = getCanvasStack();
  const roomId = useSelector(state=>state.game.roomId);

  // const currectColor = useSelector((state) => state.canvas.color);
  // const size = useSelector((state) => state.canvas.size);

  function handleMouseDown(event) {
    console.log(enableCanvas,!enableCanvas,"vdv");
    if(!enableCanvas) return;
    shouldDrawRef.current = true;

    const canvas = boardRef.current;
    const coordinates = canvas.getBoundingClientRect();

    const context = canvas.getContext("2d");

    context.strokeStyle = brushColor.value;
    context.lineWidth = brushSize;

    console.log(event);
    // console.log(event.touches[0].clientX - event.currentTarget.getBoundingClientRect().left);

    context.beginPath();
console.log(event , coordinates.left);
    tempCanvas.current.push({
      x: ((event.offsetX ? event.offsetX : (event.touches[0].clientX - coordinates.left)) / coordinates.width) * 100,
      y: ((event.offsetY ? event.offsetY : (event.touches[0].clientY - coordinates.top)) / coordinates.height) * 100,
      action: "start",
      color: brushColor.value,
      size: brushSize,
    });
    tempCanvas.current.push({
      x: (((event.offsetX ? event.offsetX : (event.touches[0].clientX - coordinates.left)) + 1) / coordinates.width) * 100,
      y: (((event.offsetY ? event.offsetY : (event.touches[0].clientY - coordinates.top)) + 1) / coordinates.height) * 100,
      action: "stop",
      color: brushColor.value,
    });
    context.moveTo((event.offsetX ? event.offsetX : (event.touches[0].clientX - coordinates.left)), (event.offsetY ? event.offsetY : (event.touches[0].clientY - coordinates.top)));
    context.lineTo((event.offsetX ? event.offsetX : (event.touches[0].clientX - coordinates.left)) + 1, (event.offsetY ? event.offsetY : (event.touches[0].clientY - coordinates.top)) + 1);
    context.stroke();
    context.beginPath();
    context.moveTo((event.offsetX ? event.offsetX : (event.touches[0].clientX - coordinates.left)), (event.offsetY ? event.offsetY : (event.touches[0].clientY - coordinates.top)));
  }
  const handleMouseMove = (event) => {
    if(!enableCanvas) return;
    if (!shouldDrawRef.current) return;
    const canvas = boardRef.current;
    const context = canvas.getContext("2d");
    const coordinates = canvas.getBoundingClientRect();
    context.lineTo((event.offsetX ? event.offsetX : (event.touches[0].clientX - coordinates.left)), (event.offsetY ? event.offsetY : (event.touches[0].clientY - coordinates.top)));
    context.stroke();
    tempCanvas.current.push({
      x: ((event.offsetX ? event.offsetX : (event.touches[0].clientX - coordinates.left)) / coordinates.width) * 100,
      y: ((event.offsetY ? event.offsetY : (event.touches[0].clientY - coordinates.top)) / coordinates.height) * 100,
      action: "draw",
      color: brushColor.value,
    });
  };

  function handleMouseUp() {
    if(!enableCanvas) return;
    if (!shouldDrawRef.current) return;
    shouldDrawRef.current = false;
    const canvas = boardRef.current;
    const context = canvas.getContext("2d");
    const coordinates = canvas.getBoundingClientRect();
    canvasStack.current.push(tempCanvas.current);
    tempCanvas.current = [];
    socket.emit('performer-drawing',{roomId, drawArray:canvasStack.current});
  }

  useEffect(() => {
    if (!boardRef.current) return;

    const canvas = boardRef.current;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    if (canvasStack.current.length && canvas) {
      redraw();
    }

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseup", handleMouseUp);

    canvas.addEventListener("touchstart", handleMouseDown);
    canvas.addEventListener("touchmove", handleMouseMove);
    canvas.addEventListener("touchend", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);

    window.addEventListener("resize", redraw);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseup", handleMouseUp);

      canvas.removeEventListener("touchstart", handleMouseDown);
      canvas.removeEventListener("touchmove", handleMouseMove);
      canvas.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);

      window.addEventListener("resize", redraw);
    };
  }, [brushColor, brushSize, enableCanvas]);



  return (
    <>
    
      <div className="canvas_contr" style={{ margin: "auto" }}>

        <div
          className={styles.canvas_conatiner}
        >
          <GameConsole />
          <canvas
            style={{
              height: "100%",
              width: "100%",
              background: "#fff",
              backgroundSize: "cover",
              borderRadius: "3px",
            }}
            ref={boardRef}
          />
        </div>
      </div>
      {/* {children({ undo, clear })} */}
    </>
  );
};

export default Board;
