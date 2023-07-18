const createNewPokemon = require("../controllers/createNewPokemon");
const findAllPokemonsApi = require("../controllers/findAllPokemonsApi");
const findAllPokemonsDB = require("../controllers/findAllPokemonsDB");


const pokemonCreateHandler = async (req, res) => {
  try{
    const {
      Nombre, Imagen, Vida, Ataque, Defensa, Velocidad, Altura, Peso, Tipo,
    } = req.body;

    console.log({
      Nombre, Imagen, Vida, Ataque, Defensa, Velocidad, Altura, Peso, Tipo,
    });

    const apiPokemons = await findAllPokemonsApi();
    const dbPokemons = await findAllPokemonsDB();

    const pokemonExistingApi = apiPokemons.find(
        (pokemon) => pokemon.Nombre.toLowerCase() === Nombre.toLowerCase()
    );

    const pokemonExistingDB = dbPokemons.find(
      (pokemon) => pokemon.Nombre.toLowerCase() === Nombre.toLowerCase()
    );

    if (pokemonExistingDB || pokemonExistingApi) {
      throw new Error("El Pokémon ya existe");
    }

    if (!Nombre || !Imagen || !Vida || !Ataque || !Defensa || !Velocidad || !Altura || !Peso || !Tipo){
      throw new Error("Faltan datos");
    } 
    
    if (Tipo.length > 2) {
      throw new Error("El Pokemon solo puede tener hasta dos tipos");
    }else {
      const newPokemon = await createNewPokemon(
        Nombre, Imagen, Vida, Ataque, Defensa, Velocidad, Altura, Peso, Tipo,
      );
      res.status(200).json(newPokemon);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = pokemonCreateHandler;