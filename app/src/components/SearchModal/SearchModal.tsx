import "reactjs-popup/dist/index.css";
import "./SearchModal.css";
import type { AllPokemonResponseArray } from "../../models/AllPokemonResponseArray";
import { useState } from "react";

interface SearchModalProps {
  data: AllPokemonResponseArray;
}

export default function SearchModal(props: SearchModalProps) {
  // TODO:
  // - track selected pokemon
  // - get sprite of selected pokemon
  // - ui

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<
    { name: string; url: string }[]
  >([]);

  const handleChange = (event: { target: { value: string } }) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    if (inputValue.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = props.data.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(inputValue.toLowerCase()),
    );

    setSuggestions(filtered.slice(0, 10));
  };

  return (
    <>
      <div className="search-modal-container">
        <h2>search modal</h2>
        <input type="text" value={value} onChange={handleChange} />
        {suggestions.length > 0 && (
          <div className="scrollable-container">
            <ul>
              {suggestions.map((pokemon) => (
                <li
                  key={pokemon.name}
                  style={{
                    listStyle: "none",
                    padding: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setValue(pokemon.name);
                    setSuggestions([]);
                  }}
                >
                  {pokemon.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
