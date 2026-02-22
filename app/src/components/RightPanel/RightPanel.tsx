import PlusButton from "../PlusButton/PlusButton";
import PokemonCircle from "../PokemonCircle/PokemonCircle";
import "./RightPanel.css";
import "../PlusButton/PlusButton.css";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import SearchModal from "../SearchModal/SearchModal";
import axios from "axios";

export default function RightPanel() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = async () => {
    await axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1500")
      .then((response) => {
        console.log(response.data);
      });
  };

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
        <SearchModal />
      </Popup>
    </>
  );
}
