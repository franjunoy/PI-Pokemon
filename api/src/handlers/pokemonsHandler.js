const { Op } = require("sequelize");
const findAllPokemonsApi = require("../controllers/findAllPokemonsApi");
const findAllPokemonsDB = require("../controllers/findAllPokemonsDB");

const pokemonsHandler = async (req, res) => {
  try {
    const { name } = req.query;
    if (name === "") {
      throw new Error("No se encontraron Pokemones con ese nombre");
    }
    if (name) {
      const namePokemonBD = await findAllPokemonsDB({
        where: {
          Nombre: { [Op.iLike]: `%${name}%` },
        },
      });
      const apiPokemons = await findAllPokemonsApi();
      const namePokemonApi = apiPokemons.filter((pokemon) => {
        return pokemon.Nombre.toLowerCase() === name.toLowerCase();
      });
      if (namePokemonApi.length === 0 && namePokemonBD.length === 0) {
        throw new Error("No se encontraron Pokemones con ese nombre");
      }
      result = [...namePokemonApi, ...namePokemonBD];
      res.status(200).json(result);
    } else {
      const allPokemonsApi = await findAllPokemonsApi();
      const allPokemonsDB = await findAllPokemonsDB();
      if (!allPokemonsDB) {
        res.status(200).json({ allPokemonsApi });
      }
      res.status(200).json([...allPokemonsApi, ...allPokemonsDB]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = pokemonsHandler;
