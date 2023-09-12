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
} from "../actions/actions_types";

const initialState = {
  pokemons: [],
  id: [],
  types: [],
  pokemonsCopy: [],
  pokemonsOrigin: [],
  pageActual: 1,
  isLoading: false,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: payload,
        pokemonsCopy: payload,
        pokemonsOrigin: payload,
      };
    case GET_POKEMON_NAME:
      state.pokemonsCopy = payload;
      return {
        ...state,
        pokemons: state.pokemonsCopy,
      };
    case GET_POKEMONS_ID:
      return {
        ...state,
        id: payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: payload,
      };
    case POST_POKEMONS:
      return {
        ...state,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case UNSET_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    case FILTER:
      if (payload === "Api") {
        const allPokemonsApi = state.pokemonsCopy.filter(
          (pokemon) => typeof pokemon.ID === "number"
        );
        return { ...state, pokemons: allPokemonsApi };
      }
      if (payload === "Base de Datos") {
        const allPokemonsBD = state.pokemonsCopy.filter(
          (pokemon) => typeof pokemon.ID === "string"
        );
        return { ...state, pokemons: allPokemonsBD };
      } else {
        return {
          ...state,
          pokemons: state.pokemonsCopy,
        };
      }
    case FILTER_BY_TYPES:
      if (payload !== "All Pokemons") {
        const filteredPokemons = state.pokemonsOrigin.filter((pokemon) =>
          pokemon.Tipo?.includes(payload)
        );
        const filteredPokemonsDB = state.pokemonsOrigin.filter((pokemon) =>
          pokemon.types?.some((type) => type.Nombre === payload)
        );
        const combinedPokemons = [...filteredPokemons, ...filteredPokemonsDB];
        const uniquePokemons = Array.from(
          new Set(combinedPokemons.map((pokemon) => pokemon.ID))
        ).map((id) => combinedPokemons.find((pokemon) => pokemon.ID === id));
        return { ...state, pokemons: uniquePokemons };
      } else {
        return {
          ...state,
          pokemons: state.pokemonsOrigin,
        };
      }

    case ORDER:
      if (payload === "AscendingAttack" || payload === "DescendingAttack") {
        const attack = [...state.pokemons];
        const attackCopy = [...state.pokemonsCopy];
        return {
          ...state,
          pokemons:
            payload === "AscendingAttack"
              ? attack.sort((a, b) => a.Ataque - b.Ataque)
              : attack.sort((a, b) => b.Ataque - a.Ataque),
          pokemonsCopy:
            payload === "AscendingAttack"
              ? attackCopy.sort((a, b) => a.Ataque - b.Ataque)
              : attackCopy.sort((a, b) => b.Ataque - a.Ataque),
        };
      }
      if (payload === "AscendingAZ" || payload === "DescendingZA") {
        const alphabetic = [...state.pokemons];
        const alphabeticCopy = [...state.pokemonsCopy];
        return {
          ...state,
          pokemons:
            payload === "AscendingAZ"
              ? alphabetic.sort((a, b) => a.Nombre.localeCompare(b.Nombre))
              : alphabetic.sort((a, b) => b.Nombre.localeCompare(a.Nombre)),
          pokemonsCopy:
            payload === "AscendingAZ"
              ? alphabeticCopy.sort((a, b) => a.Nombre.localeCompare(b.Nombre))
              : alphabeticCopy.sort((a, b) => b.Nombre.localeCompare(a.Nombre)),
        };
      }
      if (payload === "Id") {
        return {
          ...state,
          pokemons: state.pokemonsOrigin,
          pokemonsCopy: state.pokemonsOrigin,
        };
      }

    // eslint-disable-next-line no-fallthrough
    default:
      return { ...state };
  }
};
export default rootReducer;
