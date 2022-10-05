import Footer from "./components/Footer";
import Random from "./components/Random";
import "./index.css";

function App() {
  return (
    <div className="bg-dark w-screen h-screen flex flex-col items-center justify-between">
      <Random />
      <Footer />
    </div>
  );
}

export default App;
