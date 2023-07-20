import React from "react";
import { Link } from "react-router-dom";
import style from "./Nav.module.css";

const Nav = () => {
  return (
    <div>
      <Link to="/form">
        {" "}
        <button className={style.button}> </button>{" "}
      </Link>
    </div>
  );
};
export default Nav;
