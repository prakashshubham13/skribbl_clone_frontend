import React, { useContext, useState } from "react";
import { LIGHT_COLORS, DARK_COLORS } from "../../utils/constants/constants";
import { CanvasContext } from "../../utils/canvas/CanvasProvider";
import styles from "./Toolbar.module.css";
import useClickOutside from "../../custom_hooks/useClickOutside";
import useMediaWidth from "../../custom_hooks/useMediaWidth";
const ColorPallete = () => {
  const { brushColor, updateBrushColor, brushSize, updateBrushSize } =
    useContext(CanvasContext);
  const [sizeDropdown, toggleSizeDropdown] = useState(false);
  const [clickOutRef] = useClickOutside(()=>toggleSizeDropdown(false));
  const width = useMediaWidth();
  return (
    <div className={styles.pallete_container}>
      <div
      className={styles.selected_color}
        style={{
          background: brushColor.value,
        }}
      ></div>
      <div className={styles.pallete_tray}
      >
<div className={styles.pallete_list}>
{Object.keys(LIGHT_COLORS).slice(0,7).map((key) => (
        <div
          style={{
            padding: "2px",
            // border: "1px solid black",
            background: LIGHT_COLORS[key],
            height: "25px",
            width: "25px",
          }}
          onClick={() => updateBrushColor({ label: key, value: LIGHT_COLORS[key] })}
        ></div>
      ))}
      </div>
      <div className={styles.pallete_list}>
{Object.keys(DARK_COLORS).slice(0,7).map((key) => (
        <div
          style={{
            padding: "2px",
            // border: "1px solid black",
            background: DARK_COLORS[key],
            height: "25px",
            width: "25px",
          }}
          onClick={() => updateBrushColor({ label: key, value: DARK_COLORS[key] })}
        ></div>
      ))}
      </div>
</div>

      {(width > 520) && <div ref={clickOutRef} class={styles.sizes}>
        <div class={styles.size_preview} onClick={()=>toggleSizeDropdown(prev=>!prev)}>
          <div class={styles.icon} style={{backgroundSize:brushSize * 5}} ></div>
          </div>
          <div class={styles.container} style={{visibility: sizeDropdown ? 'visible' :'hidden'}} onClick={(e) => {
            console.log(e.target.parentElement.tagName === "LI");
            console.log(e.target.getAttribute('data-size'));
            updateBrushSize(e.target.getAttribute('data-size'));
            toggleSizeDropdown(false);
            }}>
          {/* <div className={styles.arrow}></div> */}
          <li class={styles.options_preview}>
          <div class={styles.icon_option} data-size={1} style={{backgroundSize: 1 * 5}} ></div>
          </li>
          <li class={styles.options_preview}>
          <div class={styles.icon_option} data-size={3} style={{backgroundSize: 3 * 5}} ></div>
          </li>
          <li class={styles.options_preview}>
          <div class={styles.icon_option} data-size={5} style={{backgroundSize: 5 * 5}} ></div>
          </li>
          <li class={styles.options_preview}>
          <div class={styles.icon_option} data-size={7} style={{backgroundSize: 7 * 5}} ></div>
          </li>
                    </div>
            </div>}
            </div>
  );
};

export default ColorPallete;
