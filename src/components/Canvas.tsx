import React, { useRef, useEffect } from "react";

function range(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

  const agents: Agent[] = [];
  for (let i = 0; i < 32; i++) {
    const x = range(0, 1366 as number);
    const y = range(0, 768 as number);

    agents.push(new Agent(x, y));
  }

  const draw: Function = (
    context: CanvasRenderingContext2D,
    frameCount: number
  ) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

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

    let frameCount = 0;
    let animationFrameId: number;

    const render = () => {
      frameCount++;
      (draw as unknown as Function)(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <canvas ref={canvasRef} width={1366} height={768} {...props} />;
};

export default Canvas;
