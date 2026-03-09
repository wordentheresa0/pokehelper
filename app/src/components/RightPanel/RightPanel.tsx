import PlusButton from "../PlusButton/PlusButton";
import PokemonCircle from "../PokemonCircle/PokemonCircle";
import "./RightPanel.css";
import "../PlusButton/PlusButton.css";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import SearchModal from "../SearchModal/SearchModal";
import { getPokemonNameArray } from "../../api/PokemonAPICalls";
import type { AllPokemonResponseArray } from "../../models/AllPokemonResponseArray";
import type { PokemonDisplayData } from "../../models/PokemonDisplayData";

export default function RightPanel() {
  const [allPokemonArr, setAllPokemonArr] = useState<AllPokemonResponseArray>([]);
  const [open, setOpen] = useState(false);
  const [displayPokemonArr, setDisplayPokemonArr] = useState<PokemonDisplayData[]>(
    new Array(6).fill({ dipslayPokemon: false, spriteUrl: "" })
  );

  // FOR TESTING PURPOSES, DELETE LATER
  useEffect(() => {
    console.log("displayPokemonArr: ", displayPokemonArr);
  }, [displayPokemonArr]);
  
  useEffect(() => {
    console.log("allPokemonArr: ", allPokemonArr);
  }, [allPokemonArr]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonNameArray();
        setAllPokemonArr(data);
      } catch (error) {
        console.error("Failed to load Pokemon: ", error);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <>

      <div className="right-red-square">
        {displayPokemonArr.map((pokemonDisplayData) => {
          if (pokemonDisplayData.displayPokemon) return <PokemonCircle spriteUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/405.png"/>;
          else return <PlusButton onClick={() => setOpen(true)} />;
        })}
      </div>

      <Popup open={open} onClose={() => setOpen(false)} modal>
        <SearchModal data={allPokemonArr} />
      </Popup>
    </>
  );
}
