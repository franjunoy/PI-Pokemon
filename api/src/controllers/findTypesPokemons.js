const { Type } = require("../db");
const axios = require("axios");

const UrlTypes = "https://pokeapi.co/api/v2/type";

const findTypesPokemons = async () => {
  const apiUrl = await axios.get(UrlTypes);
  const types = apiUrl.data.results.map((type) => type.name);

  await Promise.all(
    types.map((type) =>
      Type.findOrCreate({
        where: {
          Nombre: type,
        },
      })
    )
  );
  const allTypes = await Type.findAll();
  return allTypes;
};

module.exports = findTypesPokemons;
