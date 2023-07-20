const findAllPokemonsDB = require("./findAllPokemonsDB");

const findPokemonIdDB = async (ID) => {
  try {
    const dbPokemons = await findAllPokemonsDB();
    const dbIdPokemon = dbPokemons.find((pokemon) => pokemon.ID === ID);
    return dbIdPokemon;
  } catch (error) {
    throw new Error("Error al buscar el Pokémon por ID en la Base de Datos");
  }
};

module.exports = findPokemonIdDB;
