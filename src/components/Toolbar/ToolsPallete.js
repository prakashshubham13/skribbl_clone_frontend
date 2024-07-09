import React, { forwardRef, useContext, useState } from "react";
import { MENU_ITEMS } from "../../utils/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { changeSize } from "../../redux/canvasSlice";
import styles from "./Toolbar.module.css";
import { CanvasContext } from "../../utils/canvas/CanvasProvider";

const ToolsPallete = ({ undo, clear }) => {
  const {brushColor,updateBrushColor,brushSize,updateBrushSize} = useContext(CanvasContext);

  return (
    <div style={{ borderRadius: "10px", display:'flex',justifyContent:'space-between' }}>
          <div className={`${styles.menu} ${styles.undo}`} onClick={undo}></div>
          <div className={`${styles.menu} ${styles.clear}`} onClick={clear}></div>
    </div>
  );
};

export default ToolsPallete;
