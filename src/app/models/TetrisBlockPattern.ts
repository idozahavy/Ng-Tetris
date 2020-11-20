import { Position } from './Position';
import { TetrisPattern } from './TetrisPattern';

export class TetrisBlockPattern extends TetrisPattern {
  public rotation: number;
  public position: Position;

  constructor(pattern: TetrisPattern, position?: Position, rotation?: number) {
    super(pattern.color, pattern.pattern);
    this.position = position ? position : new Position(0, 0);
    this.rotation = rotation ? rotation : Math.floor(Math.random() * 4);
  }

  rotateClockwise(): void {
    this.rotation = (this.rotation + 1) % 4;
  }
  rotateCounterClockwise(): void {
    this.rotation = (this.rotation - 1) % 4;
    if (this.rotation < 0) this.rotation += 4;
  }

  getBlockPlacements(): Position[] {
    const pat = this.pattern;
    const pos = this.position;
    let placements: Position[] = new Array(pat.length);

    let rot: number;
    let offset: Position;
    for (let i = 0; i < placements.length; i++) {
      offset = Object.assign(pat[i]);
      rot = 0;
      while (rot++ < this.rotation) {
        offset = new Position(-offset.y, offset.x);
      }
      placements[i] = new Position(pos.x + offset.x, pos.y + offset.y);
    }
    return placements;
  }

  minY(): number {
    const pos = this.position;
    this.position = new Position(0, 0);

    const result = this.getBlockPlacements().reduce((pre, cur) => {
      pre.y = Math.min(pre.y, cur.y);
      return pre;
    }, new Position(0, 5));
    this.position = pos;
    return result.y;
  }
}
