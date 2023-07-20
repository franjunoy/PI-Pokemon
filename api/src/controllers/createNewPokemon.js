const { Pokemon, Type } = require("../db");

const createNewPokemon = async (
  Nombre,
  Imagen,
  Vida,
  Ataque,
  Defensa,
  Velocidad,
  Altura,
  Peso,
  Tipo
) => {
  try {
    const newPokemon = await Pokemon.create({
      Nombre,
      Imagen,
      Vida,
      Ataque,
      Defensa,
      Velocidad,
      Altura,
      Peso,
    });

    const types = Tipo.map(async (tipo) => {
      const existingType = await Type.findOne({
        where: { Nombre: tipo.Nombre },
      });
      if (existingType) {
        await newPokemon.addType(existingType);
      }
    });

    await Promise.all(types);

    return {
      message: "Se ha creado un nuevo Pokémon",
      newPokemon,
    };
  } catch (error) {
    throw new Error("No se pudo crear el pokemon");
  }
};

module.exports = createNewPokemon;
