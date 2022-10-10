import React, { useRef, useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Faders } from "phosphor-react";
import Random from "./Random";
import * as Toast from "@radix-ui/react-toast";

function range(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function debounce(fn: Function, ms: number) {
  let timer: any;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(null, arguments);
    }, ms);
  };
}
class Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getDistance(other: Vector): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  pos: Vector;
  speed: Vector;
  radius: number;
  color: string;
  constructor(x: number, y: number) {
    this.pos = new Vector(x, y);
    this.speed = new Vector(range(-1, 1), range(-1, 1));
    this.radius = range(1, 2);
    this.color = `rgba(164 194 244, 1)`;
  }

  bounce(width: number, height: number) {
    if (this.pos.x <= 0 || this.pos.x >= width) {
      this.speed.x *= -1;
    }
    if (this.pos.y <= 0 || this.pos.y >= height) {
      this.speed.y *= -1;
    }
  }

  update() {
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
  }

  draw(context: any) {
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.fillStyle = this.color;
    context.lineWidth = 1;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();

    context.restore();
  }
}

const Canvas = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLCanvasElement> &
    React.CanvasHTMLAttributes<HTMLCanvasElement>
) => {
  const canvasRef = useRef(null);
  const width: number = window.innerWidth;
  const height: number = window.innerHeight;

  const [numberOfStates, setNumberOfStates] = useState(350);
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

  const agents: Agent[] = [];
  for (let i = 0; i < numberOfStates; i++) {
    const x = range(0, width);
    const y = range(0, height);

    agents.push(new Agent(x, y));
  }

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

  const [dimensions, setDimensions] = React.useState({
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
        <div className="flex flex-col items-center">
          <Popover.Root>
            <Popover.Trigger
              className="bg-blue rounded-full
              flex w-11 h-11 items-center justify-center
              hover:bg-blue-hover"
            >
              <Faders className="" color="#10101A" size={22} />
            </Popover.Trigger>

            <Popover.Anchor />
            <Popover.Portal>
              <Popover.Content
                className="bg-blue opacity-80 rounded-3xl
                  min-h-[100px]
                  min-w-[200px]
                  border-2
                  border-t-0
                  border-opacity-80
                  border-white
                  flex flex-col items-center justify-center"
              >
                <Popover.Arrow className="fill-blue w-4 h-2" />
                <div className="my-2 gap-2">
                  <div className="flex items-center w-full justify-center ">
                    <label
                      className="text-dark font-serif font-semibold text-center"
                      htmlFor="nagents"
                    >
                      Agents:
                    </label>
                    <input
                      className="rounded-3xl text-center w-1/2 ml-2 bg-dark text-white"
                      id="nagents"
                      type="number"
                      step={25}
                      onChange={handleSetNumberOfStates}
                      defaultValue={numberOfStates}
                    />
                  </div>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
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
