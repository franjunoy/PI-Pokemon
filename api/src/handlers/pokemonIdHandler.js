const findPokemonIdApi = require("../controllers/findPokemonIdApi");
const findPokemonIdDB = require("../controllers/findPokemonIdDB");
const pokemonsHandler = require("./pokemonsHandler");

const pokemonIdHandler = async (req, res) => {
  try {
    const { idPokemon } = req.params;

    if (!idPokemon) {
      res.status(200).json(await pokemonsHandler(req, res));
    } else {
      const idPokemonApi = await findPokemonIdApi(Number(idPokemon));
      const idPokemonDB = await findPokemonIdDB(idPokemon);

      if (!idPokemonApi && !idPokemonDB) {
        throw new Error("No se encontró ningún Pokémon con ese ID");
      } else {
        res.status(200).json({ idPokemonApi, idPokemonDB });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = pokemonIdHandler;
