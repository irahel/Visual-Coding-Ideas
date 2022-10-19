import { MouseEventHandler } from "react";

interface ButtonOptionsProps {
  text: string;
  handleButtonNumberOfStates: MouseEventHandler<HTMLButtonElement>;
}

function ButtonOptions({
  text,
  handleButtonNumberOfStates,
}: ButtonOptionsProps) {
  return (
    <button
      className="rounded-lg bg-blue text-dark text-sm font-serif font-bold
    border-2 border-dark flex items-center justify-center py-1 px-2"
      onClick={handleButtonNumberOfStates}
    >
      {text}
    </button>
  );
}

export default ButtonOptions;
