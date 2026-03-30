import { type Move } from "pokenode-ts";

export type PokemonDisplayData = {
  name: string;
  displayPokemon: boolean;
  spriteUrl: string;
  moves: Move[];
};
