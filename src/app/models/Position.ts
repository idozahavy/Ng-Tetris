export class Position {
  constructor(public x: number, public y: number) {}
  moveBy(dx: number, dy: number): void {
    this.x += dx;
    this.y += dy;
  }
}
