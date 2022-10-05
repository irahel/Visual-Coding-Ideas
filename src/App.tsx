import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    <div className="bg-dark w-screen h-screen flex flex-col items-center justify-between">
      <button
        className="bg-blue hover:bg-blue-hover rounded-3xl w-24 h-11
      text-white font-serif font-bold
      mt-8"
      >
        Random
      </button>
      <Footer />
    </div>
  );
}

export default App;
