import {
  PokemonClient,
  MoveClient,
  type Pokemon,
  type Move,
} from "pokenode-ts";

const pokemonAPI = new PokemonClient();
const moveAPI = new MoveClient();

// Getting the pokemon "Luxray"
// Printing its moveset and the type of each move
const pokemon = await pokemonAPI
  .getPokemonByName("luxray")
  .then(async (response: Pokemon) => {
    const moves = response.moves;
    for (const move of moves) {
      await moveAPI.getMoveByName(move.move.name).then((moveResponse: Move) => {
        console.log(moveResponse.name + ", " + moveResponse.type.name);
      });
    }
  })
  .catch((error: any) => console.log("Error: ", error));

// Getting the pokemon "Luxray"
// Printing the sprites array
const pokemon1 = await pokemonAPI
  .getPokemonByName("luxray")
  .then(async (response: Pokemon) => {
    const sprites = response.sprites;
    console.log(sprites);
  });
