import React, { useRef, useEffect, useState } from "react";
import Random from "../../Random";
import { debounce, populateAgents } from "./utils";
import Options from "./Options";

const Canvas = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLCanvasElement> &
    React.CanvasHTMLAttributes<HTMLCanvasElement>
) => {
  const canvasRef = useRef(null);

  const width: number = window.innerWidth;
  const height: number = window.innerHeight;

  const [numberOfStates, setNumberOfStates] = useState(350);
  const [numberOfStatesSignal, setNumberOfStatesSignal] = useState(1);

  const handleSetNumberOfStates = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valueNumber: number = parseInt(event.target.value);
    if (valueNumber > 2000) {
      setNumberOfStates(2000);
      event.target.value = "2000";
      alert("Maximum number of agents reached");
    } else if (valueNumber < 0) {
      setNumberOfStates(0);
      event.target.value = "0";
      alert("Minimum number of agents reached");
    } else {
      setNumberOfStates(valueNumber);
    }
  };

  const handleButtonNumberOfStates = (event: any) => {
    const btnNumber: number = parseInt(event.target.innerText);
    console.log("Pegou o " + btnNumber);
    const valueNumber: number =
      numberOfStates + btnNumber * numberOfStatesSignal;
    if (valueNumber > 2000) {
      setNumberOfStates(2000);
      alert("Maximum number of agents reached");
    } else if (valueNumber < 0) {
      setNumberOfStates(0);
      alert("Minimum number of agents reached");
    } else {
      setNumberOfStates(valueNumber);
    }
  };

  const agents = populateAgents(numberOfStates, width, height);

  const draw: Function = (context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        if (dist > 66) continue;

        context.strokeStyle = "#a4c2f4";
        context.fillStyle = "#f7f7f7";

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }
    }

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
      agent.bounce(context.canvas.width, context.canvas.height);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) return;
    const context = (canvas as HTMLCanvasElement).getContext("2d");

    let animationFrameId: number;

    const render = () => {
      (draw as unknown as Function)(context);
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
          handleButtonNumberOfStates={handleButtonNumberOfStates}
          numberOfStatesSignal={numberOfStatesSignal}
          setNumberOfStatesSignal={setNumberOfStatesSignal}
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
