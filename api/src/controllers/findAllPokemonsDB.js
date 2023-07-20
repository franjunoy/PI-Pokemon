const { Pokemon, Type } = require("../db");

const findAllPokemonsDB = async (obj) => {
  const databasePokemons = await Pokemon.findAll({
    ...obj,
    include: Type,
  });
  return databasePokemons;
};

module.exports = findAllPokemonsDB;
