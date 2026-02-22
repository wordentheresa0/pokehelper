import PlusButton from "../PlusButton/PlusButton";
import PokemonCircle from "../PokemonCircle/PokemonCircle";
import "./RightPanel.css";
import "../PlusButton/PlusButton.css";
import { useEffect } from "react";
import { PokemonClient, type Pokemon } from "pokenode-ts";

export default function RightPanel() {
  const pokemonAPI = new PokemonClient();

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = async () => {
    await pokemonAPI
      .getPokemonByName("luxray")
      .then(async (response: Pokemon) => {
        const sprites = response.sprites;
        console.log(sprites);
      });
  };

  return (
    <div className="right-red-square">
      <PlusButton />
      <PlusButton />
      <PlusButton />
      <PlusButton />
      <PlusButton />
      <PokemonCircle />
    </div>
  );
}
