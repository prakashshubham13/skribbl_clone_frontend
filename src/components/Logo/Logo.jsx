import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/images/logo.gif";
import styles from "./Logo.module.css"
import ThemeButton from '../../utils/theme/ThemeButton';
const Logo = () => {
  return (
    <div className="logo_contr">
      <Link to="/">
      <img className={styles.img_container} src={logo} alt='logo'/>
      </Link>
      <ThemeButton/>
    </div>
  )
}

export default Logo