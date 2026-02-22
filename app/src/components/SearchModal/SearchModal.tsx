import "reactjs-popup/dist/index.css";
import type { AllPokemonArray } from "../../models/AllPokemonArray";
import { useState } from "react";

interface SearchModalProps {
  data: AllPokemonArray;
}

export default function SearchModal(props: SearchModalProps) {
  console.log(props);

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

    // Limit to top 10 matches
    setSuggestions(filtered.slice(0, 10));
  };

  return (
    <>
      <h2>search modal</h2>
      <input type="text" value={value} onChange={handleChange} />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul
          style={{ border: "1px solid #ccc", padding: "0", marginTop: "5px" }}
        >
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
      )}
    </>
  );
}
