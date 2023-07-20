const findAllPokemonsApi = require("./findAllPokemonsApi");

const findPokemonIdApi = async (ID) => {
  try {
    const apiPokemons = await findAllPokemonsApi();
    const apiIdPokemon = apiPokemons.find((pokemon) => pokemon.ID === ID);
    return apiIdPokemon;
  } catch (error) {
    throw new Error("Error al buscar el Pokémon por ID en la API");
  }
};

module.exports = findPokemonIdApi;
