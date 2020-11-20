import { Position } from './Position';

export class TetrisBlock {
  position: Position;
  color: string;
  free = true;
  user = false;

  constructor(position: Position, color: string) {
    this.position = position;
    this.color = color;
  }
}
