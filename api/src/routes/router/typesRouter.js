const { Router } = require("express");
const typesHandler = require("../../handlers/typesHandler");

const typesRouter = Router();

typesRouter.get("/", typesHandler);

module.exports = typesRouter;
