import React, { useRef, useEffect, useState } from "react";
import { createNoise2D } from "simplex-noise";
import Random from "../../Random";
import { mapRange } from "../../utils";
import { debounce } from "../graphs/utils";
import Options from "./Options";

const params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 5,
  freq: 0.1,
  amp: 0.2,
};

const Canvas = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLCanvasElement> &
    React.CanvasHTMLAttributes<HTMLCanvasElement>
) => {
  const [cols, setCols] = useState(10);
  const [rows, setRows] = useState(10);

  const canvasRef = useRef(null);

  const width: number = window.innerWidth;
  const height: number = window.innerHeight;

  const noise = createNoise2D();

  const draw: Function = (context: CanvasRenderingContext2D, frame: number) => {
    context.clearRect(0, 0, width, height);

    const numCells = cols * rows;

    const gridw = width;
    const gridh = height;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;

      const n = noise(x + frame / 100, y);

      const angle = n * Math.PI * params.amp;
      const scale = mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

      context.save();
      context.fillStyle = "#a4c2f4";
      context.strokeStyle = "#a4c2f4";
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw * 0.5, cellh * 0.5);
      context.rotate(angle);
      context.lineWidth = scale;

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(h * 0.5, 0);
      context.stroke();

      context.restore();
    }
  };

  useEffect(() => {
    let frame = 0;

    const canvas = canvasRef.current;
    if (canvas == null) return;
    const context = (canvas as HTMLCanvasElement).getContext("2d");

    let animationFrameId: number;

    const render = () => {
      frame++;
      (draw as unknown as Function)(context, frame);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  const [_, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  React.useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 3);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  return (
    <>
      <div className="flex flex-row gap-2 z-50 mt-8">
        <Random setFunction={() => {}} />

        <Options
          numberOfStates={numberOfStates}
          handleSetNumberOfStates={handleSetNumberOfStates}
        />
      </div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="absolute z-0"
        {...props}
      />
    </>
  );
};

export default Canvas;
