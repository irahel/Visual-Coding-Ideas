export class Vector {
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