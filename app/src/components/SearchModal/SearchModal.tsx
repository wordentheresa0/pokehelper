import "./SearchModal.css";
import type { AllPokemonResponseArray } from "../../models/AllPokemonResponseArray";
import { useState, useRef, useEffect } from "react";

interface SearchModalProps {
  data: AllPokemonResponseArray;
  onConfirm?: (pokemon: { name: string; id: string }) => void;
  onClose?: () => void;
}

function getIdFromUrl(url: string): string {
  const matches = url.match(/\/(\d+)\//g);
  return matches ? matches[matches.length - 1].replace(/\//g, "") : "0";
}

function spriteUrl(id: string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export default function SearchModal({ data, onConfirm, onClose }: SearchModalProps) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<{ name: string; url: string }[]>([]);
  const [selected, setSelected] = useState<{ name: string; id: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    setSelected(null);

    if (!v.trim()) {
      setSuggestions([]);
      return;
    }

    setSuggestions(
      data
        .filter((p) => p.name.toLowerCase().startsWith(v.toLowerCase()))
        .slice(0, 8)
    );
  };

  const handleSelect = (pokemon: { name: string; url: string }) => {
    const id = getIdFromUrl(pokemon.url);
    setValue(pokemon.name);
    setSuggestions([]);
    setSelected({ name: pokemon.name, id });
  };

  const handleClear = () => {
    setValue("");
    setSuggestions([]);
    setSelected(null);
  };

  const handleConfirm = () => {
    if (!selected) return;
    onConfirm?.(selected);
    onClose?.();
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="search-modal-container" ref={containerRef}>
      <p className="search-label">Pokédex search</p>

      <div className="search-input-row">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="6.5" cy="6.5" r="4.5" />
          <line x1="10.5" y1="10.5" x2="14" y2="14" />
        </svg>
        <input
          className="search-input"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search Pokémon..."
          autoComplete="off"
        />
        {value && (
          <button className="search-clear" onClick={handleClear}>✕</button>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="search-dropdown">
          {suggestions.map((pokemon) => {
            const id = getIdFromUrl(pokemon.url);
            return (
              <div
                key={pokemon.name}
                className="search-item"
                onClick={() => handleSelect(pokemon)}
              >
                <img className="search-sprite" src={spriteUrl(id)} alt={pokemon.name} />
                <div>
                  <div className="search-item-name">{pokemon.name}</div>
                  <div className="search-item-id">#{id.padStart(3, "0")}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selected && (
        <div className="search-selected">
          <img
            className="search-selected-sprite"
            src={spriteUrl(selected.id)}
            alt={selected.name}
          />
          <div className="search-selected-info">
            <div className="search-selected-name">{selected.name}</div>
            <div className="search-selected-sub">#{selected.id.padStart(3, "0")}</div>
          </div>
          <button className="search-confirm-btn" onClick={handleConfirm}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="2.5,8.5 6,12 13.5,4.5" />
            </svg>
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}