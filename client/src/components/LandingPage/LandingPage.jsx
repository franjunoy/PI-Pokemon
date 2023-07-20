import React from "react";
import { Link } from "react-router-dom";
import logoInicio from "../../assets/logoInicio.png";
import style from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={style.LandingPage}>
      <img src={logoInicio} alt="Pokemon" className={style.PokemonImg} />
      <h1 className={style.h1}>BIENVENIDO ASPIRANTE A ENTRENADOR POKEMON</h1>
      <Link to="/home">
        <button className={style.button}></button>
      </Link>
      <h3 className={style.h3}>APRIETA LA POKEBALL PARA EMPEZAR</h3>
    </div>
  );
};

export default LandingPage;
