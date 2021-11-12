import React from 'react';
import styles from './Navbar.module.css'
import {Link} from "react-router-dom";
import WeatherForm from "../WeatherForm/WeatherForm";
const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <i className="icon-cloud-moon-snow"/>
      </div>
      <WeatherForm />
      <nav className={styles.nav}>
        <Link to={'/'}>
          Home
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;