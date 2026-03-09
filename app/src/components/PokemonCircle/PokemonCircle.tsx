import "./PokemonCircle.css";

interface PokemonCircleProps {
  spriteUrl: string;
}

export default function PokemonCircle(props: PokemonCircleProps) {
  return (
    <div className="circle-container">
      <img src={props.spriteUrl} />
    </div>
  );
}

// test url: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/405.png
