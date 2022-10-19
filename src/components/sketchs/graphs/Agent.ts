import { Vector } from "./Vector";
import { range } from "../../utils";

export class Agent {
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