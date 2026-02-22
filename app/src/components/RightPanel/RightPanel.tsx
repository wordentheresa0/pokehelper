import PlusButton from "../PlusButton/PlusButton";
import PokemonCircle from "../PokemonCircle/PokemonCircle";
import "./RightPanel.css";
import "../PlusButton/PlusButton.css";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import SearchModal from "../SearchModal/SearchModal";
import { getPokemonNameArray } from "../../api/PokemonAPICalls";
import type { AllPokemonArray } from "../../models/AllPokemonArray";

export default function RightPanel() {
  const [allPokemonArr, setAllPokemonArr] = useState<AllPokemonArray>([]);
  const [open, setOpen] = useState(false);

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
    console.log(allPokemonArr);
  }, []);

  return (
    <>
      <div className="right-red-square">
        <PlusButton onClick={() => setOpen(true)} />
        <PlusButton onClick={() => setOpen(true)} />
        <PlusButton onClick={() => setOpen(true)} />
        <PlusButton onClick={() => setOpen(true)} />
        <PlusButton onClick={() => setOpen(true)} />
        <PokemonCircle />
      </div>

      <Popup open={open} onClose={() => setOpen(false)} modal>
        <SearchModal data={allPokemonArr}/>
      </Popup>
    </>
  );
}
