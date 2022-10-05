import { useEffect, useRef, useState } from "react";
import Footer from "./components/Footer";
import Random from "./components/Random";
import "./index.css";
import Canvas from "./components/Canvas";

function App() {
  return (
    <div className="bg-dark w-screen h-screen flex flex-col items-center justify-between">
      <Random setFunction={() => {}} />

      <Canvas />

      <Footer />
    </div>
  );
}

export default App;
