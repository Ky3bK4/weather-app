import React from "react";
import styles from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import WeatherForm from "../WeatherForm/WeatherForm";
const Navbar = () => {

  let routeLocation = useLocation();
  const isHome = routeLocation.pathname === "/";

  return (
    <div className={styles.navbar}>
      {isHome && <WeatherForm />}
      <nav className={styles.nav}>
        <Link to={"/"}>Home</Link>
      </nav>
    </div>
  );
};

export default Navbar;
