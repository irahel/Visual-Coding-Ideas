interface props {
  setFunction: Function;
}

function Random({ setFunction }: props) {
  return (
    <button
      className="bg-blue hover:bg-blue-hover rounded-3xl w-24 h-11
      text-dark font-serif font-bold
      mt-8
      z-50"
      onClick={() => {
        setFunction(true);
      }}
    >
      Random
    </button>
  );
}

export default Random;
