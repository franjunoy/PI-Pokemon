import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonName, getPokemons } from "../../redux/actions/actions"
import style from "./SearchBar.module.css";
import Pokedex from "../../assets/Pokedex.png";

const SearchBar = () => {
const dispatch = useDispatch()
const [nombre, setNombre] = useState("");
const [error, setError] = useState(null);

const handleSubmit = (event) => {
  event.preventDefault()
  if (!nombre) {
    return setError("Ingrese un nombre válido");
  } else {
    dispatch(getPokemonName(nombre));
}};

useEffect(() => {
  dispatch(getPokemons());
}, [dispatch])

const handleChange = (event) => {
  event.preventDefault()
  setNombre(event.target.value);
};

const handleClear = (event) => {
  event.preventDefault();
  dispatch(getPokemons());
}

  return (
    <div className={style.container}>
    <img src={Pokedex} alt="Pokedex" className={style.image} />
    <div className={style.buttonInput}>
    <input type="text" placeholder="Ingrese un nombre" onChange={handleChange}/>
    <button className={style.button} type="submit" onClick={handleSubmit}>BUSCAR</button>
    <button className={style.button} onClick={handleClear}>BORRAR</button>
    </div>
  </div>
    );
}

export default SearchBar;
