import React, { useContext } from "react";
import styles from "./ThemeButton.module.css"
import ThemeContext, { Theme } from "./ThemeContext";
const ThemeButton = () => {
    const {themeMode, changeTheme} = useContext(Theme);
  return (
  <>
<label className={styles.theme_btn} >
<input type="checkbox" tabIndex={0} onChange={()=>changeTheme()} />
      <span className={styles.switch} style={{ transform: themeMode === 'dark' ? 'translate(-80%, 0)' : 'translate(10%,0)', backgroundColor: themeMode === 'dark' ? 'black' : '#ffc400'   }}></span>
           </label>
  </>
  );
};

export default ThemeButton;
