import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { Theme } from '../utils/theme/ThemeContext';

const Protected = ({children}) => {
    const {socket} = useContext(Theme);
  return (
    <>{socket !== null ? <Outlet/> : <Navigate to="/"/>}</>
  )
}

export default Protected