import Footer from "./components/Footer";
import "./index.css";
import Canvas from "./components/Canvas";

function App() {
  return (
    <div className="bg-dark w-screen h-screen flex flex-col items-center justify-between">
      <Canvas />

      <Footer />
    </div>
  );
}

export default App;
