const pokemonIdHandler = require("../src/handlers/pokemonIdHandler");
const { findPokemonIdApi, findPokemonIdDB } = require("../src/controllers/");

jest.mock("../controllers/findPokemonIdApi", () => jest.fn());
jest.mock("../controllers/findPokemonIdDB", () => jest.fn());

const mockPokemonsHandlerResponse = [{ id: 1, name: "Bulbasaur" }];
jest.mock("./pokemonsHandler", () =>
  jest.fn().mockResolvedValue(mockPokemonsHandlerResponse)
);

describe("pokemonIdHandler", () => {
  it("debe devolver el resultado de findPokemonIdApi y findPokemonIdDB si se proporciona un ID de Pokémon", async () => {
    const req = { params: { idPokemon: "123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockApiResult = { id: 123, name: "Charmander" };
    const mockDBResult = { id: "123", name: "Charmander" };

    findPokemonIdApi.mockResolvedValueOnce(mockApiResult);
    findPokemonIdDB.mockResolvedValueOnce(mockDBResult);

    await pokemonIdHandler(req, res);

    expect(findPokemonIdApi).toHaveBeenCalledWith(123);
    expect(findPokemonIdDB).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      idPokemonApi: mockApiResult,
      idPokemonDB: mockDBResult,
    });
  });

  it("debe devolver un error si no se encuentra ningún Pokémon con el ID proporcionado", async () => {
    const req = { params: { idPokemon: "456" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    findPokemonIdApi.mockResolvedValueOnce(null);
    findPokemonIdDB.mockResolvedValueOnce(null);

    await pokemonIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "No se encontró ningún Pokémon con ese ID",
    });
  });
});
