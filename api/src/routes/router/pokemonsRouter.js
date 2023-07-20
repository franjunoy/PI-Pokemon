const { Router } = require("express");
const pokemonsHandler = require("../../handlers/pokemonsHandler");
const pokemonIdHandler = require("../../handlers/pokemonIdHandler");
const pokemonCreateHandler = require("../../handlers/pokemonCreateHandler");

const pokemonsRouter = Router();

pokemonsRouter.get("/", pokemonsHandler);

pokemonsRouter.get("/:idPokemon", pokemonIdHandler);

pokemonsRouter.post("/", pokemonCreateHandler);

module.exports = pokemonsRouter;
