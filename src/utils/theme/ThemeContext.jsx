import React, { createContext, useEffect, useLayoutEffect, useState } from 'react'

export const Theme = createContext(null);

const ThemeContext = ({children}) => {
    const [themeMode, toggleThemeMode] = useState((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        document.documentElement.setAttribute('data-theme',themeMode);
    }, [themeMode]);
    function changeTheme(){
        toggleThemeMode(prev => prev === 'light' ? 'dark' : 'light');
    };
    function updateSocket(soc){
      setSocket(soc);
    }
  return (
    <Theme.Provider value={{themeMode,changeTheme,socket,updateSocket}}>{children}</Theme.Provider>
  )
}

export default ThemeContext