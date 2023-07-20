const { Type } = require("../db");
const findTypesPokemons = require("../controllers/findTypesPokemons");

const typesHandler = async (req, res) => {
  try {
    const dbTypes = await Type.findAll();
    if (dbTypes.length > 0) {
      res.status(200).json(dbTypes);
    } else {
      res.status(200).json(await findTypesPokemons());
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = typesHandler;
