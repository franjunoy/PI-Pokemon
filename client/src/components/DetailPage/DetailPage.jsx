import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonsId } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import style from "./DetailPage.module.css";
import Home from "../../assets/Home.png";

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
import loading from "../../assets/png-transparent-poke-ball-thumbnail.png"
import { useState } from "react";

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

const DetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pokemon = useSelector((state) => state.id);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getPokemonsId(id))
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error de busqueda:", error);
        setIsLoading(false);
      });
  }, [dispatch, id]);

  return (
    <div className={style.container}>
      <div>
        <Link to="/home">
          {" "}
          <button>
            <img src={Home} alt="Home" className={style.button} />
            Home
          </button>{" "}
        </Link>
      </div>

      {isLoading ? (
        <div className={style.loading}>
        <img src={loading} alt="Pokeball" />
      </div>
      ) : (
        <div>
          {pokemon && pokemon.idPokemonApi && (
            <div className={style.containerPokemon}>
              <img
                src={pokemon.idPokemonApi.Imagen}
                alt={pokemon.idPokemonApi.Nombre}
                className={style.image}
              />
              <h1 className={style.idNombre}>
                {pokemon.idPokemonApi.ID} {" - "} {pokemon.idPokemonApi.Nombre}
              </h1>
              <h3 className={style.types}>
                {pokemon.idPokemonApi.Tipo.map((type) => (
                  <img
                    className={style.PokemonTypeImage}
                    src={getImageByType(type)}
                    alt={type}
                    key={type}
                  />
                ))}
              </h3>
              <div className={style.h5}>
                <div className={style.first}>
                  <h5>-Ataque: {pokemon.idPokemonApi.Ataque}</h5>
                  <h5>-Defensa: {pokemon.idPokemonApi.Defensa}</h5>
                </div>
                <div className={style.second}>
                  <h5>-Velocidad: {pokemon.idPokemonApi.Velocidad}</h5>
                  <h5>-Vida: {pokemon.idPokemonApi.Vida}</h5>
                </div>
                <div className={style.third}>
                  <h5>-Altura: {pokemon.idPokemonApi.Altura}m</h5>
                  <h5>-Peso: {pokemon.idPokemonApi.Peso}kg</h5>
                </div>
              </div>
            </div>
          )}

          {pokemon && pokemon.idPokemonDB && (
            <div className={style.containerPokemon}>
              <img
                src={pokemon.idPokemonDB.Imagen}
                alt={pokemon.idPokemonDB.Nombre}
                className={style.image}
              />
              <div className={style.idNombreDB}>
                <h4>{pokemon.idPokemonDB.ID}</h4>
                <h1>{pokemon.idPokemonDB.Nombre}</h1>
              </div>
              <h3 className={style.types}>
                {pokemon.idPokemonDB.types.map((type) => (
                  <img
                    className={style.PokemonTypeImage}
                    src={getImageByType(type.Nombre)}
                    alt={type.Nombre}
                    key={type.Nombre}
                  />
                ))}
              </h3>
              <div className={style.h5}>
                <div className={style.first}>
                  <h5>-Ataque: {pokemon.idPokemonDB.Ataque}</h5>
                  <h5>-Defensa: {pokemon.idPokemonDB.Defensa}</h5>
                </div>
                <div className={style.second}>
                  <h5>-Velocidad: {pokemon.idPokemonDB.Velocidad}</h5>
                  <h5>-Vida: {pokemon.idPokemonDB.Vida}</h5>
                </div>
                <div className={style.third}>
                  <h5>-Altura: {pokemon.idPokemonDB.Altura}</h5>
                  <h5>-Peso: {pokemon.idPokemonDB.Peso}</h5>
                </div>
              </div>
            </div>
          )}

          <div className={style.espacio}></div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
