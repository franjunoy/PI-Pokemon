const axios = require("axios");

const URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

const findAllPokemonsApi = async () => {
  try {
    const apiUrl = await axios.get(URL);
    const apiData = apiUrl.data.results.map(async (pokemon) => {
      const pokemonData = await axios.get(pokemon.url);
      return {
        ID: pokemonData.data.id,
        Nombre: pokemonData.data.name,
        Imagen: pokemonData.data.sprites.other.dream_world.front_default,
        Vida: pokemonData.data.stats[0].base_stat,
        Ataque: pokemonData.data.stats[1].base_stat,
        Defensa: pokemonData.data.stats[2].base_stat,
        Velocidad: pokemonData.data.stats[3].base_stat,
        Altura: pokemonData.data.height,
        Peso: pokemonData.data.weight,
        Tipo: pokemonData.data.types.map((type) => type.type.name),
      };
    });
    return Promise.all(apiData);
  } catch (error) {
    throw new Error("No se pudo obtener los Pokemones de la API");
  }
};

module.exports = findAllPokemonsApi;
