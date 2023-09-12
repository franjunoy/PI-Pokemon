import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonName,
  getPokemons,
  setLoading,
  unsetLoading,
} from "../../redux/actions/actions";
import style from "./SearchBar.module.css";
import Pokedex from "../../assets/Pokedex.png";
import loading from "../../assets/png-transparent-poke-ball-thumbnail.png";
import { Link } from "react-router-dom";
import huevoPokemon from "../../assets/huevoPokemon.png";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState("");
  const isLoading = useSelector((state) => state.isLoading);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setLoading());
    try {
      await dispatch(getPokemonName(nombre));
    } catch (error) {}
    dispatch(unsetLoading());
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  const handleChange = (event) => {
    event.preventDefault();
    setNombre(event.target.value);
  };

  const handleClear = async (event) => {
    event.preventDefault();
    dispatch(setLoading());
    setNombre("");
    await dispatch(getPokemons());
    dispatch(unsetLoading());
  };

  return (
    <div className={style.container}>
      <div className={style.divForm}>
        <Link to="/form" className={style.linkForm}>
          <button className={style.buttonForm}>
            <img
              src={huevoPokemon}
              alt="huevoPokemon"
              className={style.imageForm}
            />
            <h2 className={style.h2Form}> CREAR POKEMON </h2>
          </button>
        </Link>
      </div>
      <div className={style.divSearch}>
        <img src={Pokedex} alt="Pokedex" className={style.image} />
        <div className={style.divInput}>
          <div className={style.input}>
            <input
              type="text"
              placeholder="Ingrese un nombre"
              onChange={handleChange}
              value={nombre}
            />
          </div>
          <div className={style.buttonInput}>
            <button
              className={style.button}
              type="submit"
              onClick={handleSubmit}
            >
              Buscar
            </button>
            <button className={style.button} onClick={handleClear}>
              Borrar
            </button>
          </div>
        </div>
        {isLoading && (
          <div className={style.loading}>
            <img src={loading} alt="Pokeball" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
