import { Position } from './Position';

export class TetrisBlock {
  position: Position;
  color: string;
  temp = true;

  constructor(position: Position, color: string) {
    this.position = position;
    this.color = color;
  }
}
