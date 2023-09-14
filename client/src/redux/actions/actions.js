import axios from "axios";
import {
  GET_POKEMONS,
  GET_POKEMON_NAME,
  GET_POKEMONS_ID,
  GET_TYPES,
  POST_POKEMONS,
  FILTER,
  ORDER,
  FILTER_BY_TYPES,
  SET_LOADING,  
  UNSET_LOADING,
} from "./actions_types";

export const getPokemons = () => {
  return async (dispatch) => {
    const { data } = await axios.get("https://pi-pokemon-production-f8f8.up.railway.app/pokemons");
    dispatch({
      type: GET_POKEMONS,
      payload: data,
    });
  };
};

export const getPokemonName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://pi-pokemon-production-f8f8.up.railway.app/pokemons?name=${name}`
      );
      dispatch({
        type: GET_POKEMON_NAME,
        payload: data,
      });
    } catch {
      alert("Ingrese un nombre válido")
    }
  };
};
export const getPokemonsId = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`https://pi-pokemon-production-f8f8.up.railway.app/pokemons/${id}`);
    dispatch({
      type: GET_POKEMONS_ID,
      payload: data,
    });
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    const { data } = await axios.get("https://pi-pokemon-production-f8f8.up.railway.app/types");
    dispatch({
      type: GET_TYPES,
      payload: data,
    });
  };
};

export const createPokemons = (pokemon) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      "https://pi-pokemon-production-f8f8.up.railway.app/pokemons",
      pokemon
    );
    return {
      type: POST_POKEMONS,
      payload: data,
    };
  };
};

export const filterPokemon = (filter) => {
  return {
    type: FILTER,
    payload: filter,
  };
};

export const filterByTypes = (filter) => {
  return {
    type: FILTER_BY_TYPES,
    payload: filter,
  };
};

export const orderPokemons = (order) => {
  return {
    type: ORDER,
    payload: order,
  };
};

export const setLoading = () => ({
  type: SET_LOADING,
});

export const unsetLoading = () => ({
  type: UNSET_LOADING,
});
