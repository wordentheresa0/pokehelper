import axios from "axios";
import type { AllPokemonResponseArray } from "../models/AllPokemonResponseArray";

async function getPokemonNameArray(): Promise<AllPokemonResponseArray> {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=1500",
    );

    const filteredResults: AllPokemonResponseArray = response.data.results.filter(
      (pokemon: { name: string; url: string }) => !pokemon.name.includes("-"),
    );

    return filteredResults;
  } catch (error) {
    console.error("Error fetching all Pokemon data: ", error);
    throw error;
  }
}

export { getPokemonNameArray };
