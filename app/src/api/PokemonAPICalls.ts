import axios from "axios";
import type { AllPokemonArray } from "../models/AllPokemonArray";

async function getPokemonNameArray(): Promise<AllPokemonArray> {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=1500",
    );
    const results: AllPokemonArray = response.data.results;
    return results;
  } catch (error) {
    console.error("Error fetching all Pokemon data: ", error);
    throw error;
  }
}

export { getPokemonNameArray };
