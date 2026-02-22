interface PlusButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function PlusButton({ onClick }: PlusButtonProps) {
  return (
    <button onClick={onClick} className="circle">
      <div className="horizontal-plus"></div>
      <div className="vertical-plus"></div>
    </button>
  );
}
