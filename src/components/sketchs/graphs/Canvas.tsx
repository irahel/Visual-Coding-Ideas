import React, { useRef, useEffect, useState } from "react";
import Random from "../../Random";
import { debounce, handlerSetState, populateAgents } from "./utils";
import Options from "./Options";
import { maxB2N } from "../../utils";

const Canvas = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLCanvasElement> &
    React.CanvasHTMLAttributes<HTMLCanvasElement>
) => {
  const canvasRef = useRef(null);

  const width: number = window.innerWidth;
  const height: number = window.innerHeight;

  const defaultValues = {
    numberOfStates: 350,
    numberOfStatesSignal: 1,
    distanceToConnection: 66,
    speedX: 1,
    speedY: 1,
    size: 1,
    lineSize: 1,
  };

  //params
  const [numberOfStates, setNumberOfStates] = useState(350);
  const [numberOfStatesSignal, setNumberOfStatesSignal] = useState(1);
  const maxNumberOfStates = 2000;

  const [distanceToConnection, setDistanceToConnection] = useState(66);
  const maxDistanceToConnection = maxB2N(width, height);

  const [speedX, setSpeedX] = useState(1);
  const [speedY, setSpeedY] = useState(1);
  const limitOfSpeed = 50;

  const [size, setSize] = useState(1);
  const maxSize = 30;

  const [lineSize, setLineSize] = useState(1);
  const maxLineSize = 10;

  //handlers for params
  const handleSetNumberOfStates = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handlerSetState(event, setNumberOfStates, maxNumberOfStates, 0);
  };

  const handleButtonNumberOfStates = (event: any) => {
    const btnNumber: number = parseInt(event.target.innerText);
    console.log("Pegou o " + btnNumber);
    const valueNumber: number =
      numberOfStates + btnNumber * numberOfStatesSignal;
    if (valueNumber > maxNumberOfStates) {
      setNumberOfStates(maxNumberOfStates);
      event.target.value = maxNumberOfStates.toString();
      alert("Maximum number of agents reached");
    } else if (valueNumber < 0) {
      setNumberOfStates(0);
      event.target.value = "0";
      alert("Minimum number of agents reached");
    } else {
      setNumberOfStates(valueNumber);
    }
  };

  const handleSetDistanceToConnect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handlerSetState(event, setDistanceToConnection, maxDistanceToConnection, 0);
  };

  const handleSetSpeedX = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlerSetState(event, setSpeedX, limitOfSpeed, 0);
  };

  const handleSetSpeedY = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlerSetState(event, setSpeedY, limitOfSpeed, 0);
  };

  const handleSetSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlerSetState(event, setSize, maxSize, 0);
  };

  const handleSetLineSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlerSetState(event, setLineSize, maxLineSize, 1);
  };

  const setDefaultValues = () => {
    setNumberOfStates(defaultValues.numberOfStates);
    setNumberOfStatesSignal(defaultValues.numberOfStatesSignal);
    setDistanceToConnection(defaultValues.distanceToConnection);
    setSpeedX(defaultValues.speedX);
    setSpeedY(defaultValues.speedY);
    setSize(defaultValues.size);
    setLineSize(defaultValues.lineSize);
  };

  const agents = populateAgents(
    numberOfStates,
    width,
    height,
    speedX,
    speedY,
    size
  );

  const draw: Function = (context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        if (dist > distanceToConnection) continue;

        context.strokeStyle = "#a4c2f4";
        context.fillStyle = "#f7f7f7";
        context.lineWidth = lineSize;
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
          distanceToConnect={distanceToConnection}
          handleSetDistanceToConnect={handleSetDistanceToConnect}
          speedX={speedX}
          handleSetSpeedX={handleSetSpeedX}
          speedY={speedY}
          handleSetSpeedY={handleSetSpeedY}
          size={size}
          handleSetSize={handleSetSize}
          lineSize={lineSize}
          handleSetLineSize={handleSetLineSize}
          setDefaultValues={setDefaultValues}
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
