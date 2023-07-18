import React from "react";
import style from "./Pokemon.module.css";
import { Link } from "react-router-dom";

import unknownImage from "../../assets/tipoDesc.png";
import steelImage from "../../assets/tipoAcero.png";
import waterImage from "../../assets/tipoAgua.png";
import bugImage from "../../assets/tipoBicho.png";
import dragonImage from "../../assets/tipoDragon.png";
import electricImage from "../../assets/tipoElectrico.png";
import ghostImage from "../../assets/tipoFantasma.png";
import fireImage from "../../assets/tipoFuego.png";
import fairyImage from "../../assets/tipoHada.png";
import iceImage from "../../assets/tipoHielo.png";
import fightingImage from "../../assets/tipoLucha.png";
import normalImage from "../../assets/tipoNormal.png";
import grassImage from "../../assets/tipoGrass.png";
import psychicImage from "../../assets/tipoPsiquico.png";
import rockImage from "../../assets/tipoRoca.png";
import darkImage from "../../assets/tipoSiniestro.png";
import groundImage from "../../assets/tipoTierra.png";
import poisonImage from "../../assets/tipoVeneno.png";
import flyingImage from "../../assets/tipoVolador.png";

const getImageByType = (type) => {
  const typeImages = {
    unknown: unknownImage,
    steel: steelImage,
    water: waterImage,
    bug: bugImage,
    dragon: dragonImage,
    electric: electricImage,
    ghost: ghostImage,
    fire: fireImage,
    fairy: fairyImage,
    ice: iceImage,
    fighting: fightingImage,
    normal: normalImage,
    grass: grassImage,
    psychic: psychicImage,
    rock: rockImage,
    dark: darkImage,
    ground: groundImage,
    poison: poisonImage,
    flying: flyingImage,
  };

  return typeImages[type.toLowerCase()];
};

const Pokemon = ({ pokemons }) => {
  return (
    <div className={style.PokemonGrid}>
      {pokemons.map((pokemon) => (
        <div className={style.PokemonCard} key={pokemon.Nombre}>
          <Link to={`/detail/${pokemon.ID}`}>
            <img
              className={style.PokemonImage}
              src={pokemon.Imagen}
              alt={pokemon.Nombre}
            />
          </Link>
          <h3 className={style.PokemonName}>{pokemon.Nombre}</h3>
          <h4 className={style.PokemonTypes}>
            {pokemon.Tipo?.map((type) => (
              <img
                className={style.PokemonTypeImage}
                src={getImageByType(type)}
                alt={type}
                key={type}
              />
            ))}
          </h4>
          <h4 className={style.PokemonTypes}>
            {pokemon.types?.map((type) => (
              <img
                className={style.PokemonTypeImage}
                src={getImageByType(type.Nombre)}
                alt={type.Nombre}
                key={type.Nombre}
              />
            ))}
          </h4>
        </div>
      ))}
    </div>
  );
};


export default Pokemon;


