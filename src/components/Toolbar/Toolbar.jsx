import React, { useContext } from "react";
import ColorPallete from "./ColorPallete";
import ToolsPallete from "./ToolsPallete";
import { CanvasContext } from "../../utils/canvas/CanvasProvider";

const Toolbar = ({ value }) => {
  const { enableCanvas } = useContext(CanvasContext);
  console.log("-----------------------Tool------------------------");
  return (
    <div className="tool_contr">  
      {enableCanvas ? (
        <>
          <ColorPallete />
          <ToolsPallete undo={value.undo} clear={value.clear} />
        </>
      ) : null}
    </div>
  );
};

export default Toolbar;
