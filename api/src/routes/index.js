const { Router } = require('express');
const pokemonsRouter = require("./router/pokemonsRouter");
const typesRouter = require("./router/typesRouter");

const router = Router();
router.use("/pokemons", pokemonsRouter);
router.use("/types", typesRouter);

module.exports = router;
