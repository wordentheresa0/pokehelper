import axios from "axios";
import type { AllPokemonResponseArray } from "../models/AllPokemonResponseArray";
import type { PokemonDisplayData } from "../models/PokemonDisplayData";
import {
  PokemonClient,
  MoveClient,
  type Pokemon,
  type Move,
} from "pokenode-ts";

const pokemonAPI = new PokemonClient();
const moveAPI = new MoveClient();

async function getPokemonNameArray(): Promise<AllPokemonResponseArray> {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=1500",
    );

    const filteredResults: AllPokemonResponseArray =
      response.data.results.filter(
        (pokemon: { name: string; url: string }) => !pokemon.name.includes("-"),
      );

    return filteredResults;
  } catch (error) {
    console.error("Error fetching all Pokemon data: ", error);
    throw error;
  }
}

async function getSelectedPokemonDisplayData(
  name: string,
): Promise<PokemonDisplayData> {
  try {
    const response: Pokemon = await pokemonAPI.getPokemonByName(name);

    const moveArray: Move[] = await Promise.all(
      response.moves.map((move) => moveAPI.getMoveByName(move.move.name)),
    );

    const pokemon: PokemonDisplayData = {
      name: name,
      displayPokemon: true,
      spriteUrl: response.sprites.front_default || "",
      moves: moveArray,
    };

    return pokemon;
  } catch (error) {
    console.error("Error fetching pokemon with name: ", name, error);
    throw error;
  }
}

export { getPokemonNameArray, getSelectedPokemonDisplayData };
