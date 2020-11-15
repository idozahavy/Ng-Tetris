import { newArray } from '@angular/compiler/src/util';
import { of } from 'rxjs';
import { Position } from './Position';
import { TetrisPattern } from './TetrisPattern';

export class TetrisBlockPattern {
  private rotation: number = Math.floor(Math.random() * 4);

  constructor(public pattern: TetrisPattern, public position?: Position) {
    if (!position){
      this.position = new Position(0,0);
    }
  }

  rotateClockwise(): void {
    this.rotation = (this.rotation + 1) % 4;
  }
  rotateCounterClockwise(): void {
    this.rotation = (this.rotation - 1) % 4;
  }

  getBlockPlacements(): Position[] {
    const pat = this.pattern.pattern;
    const pos = this.position;
    let placements: Position[] = new Array(pat.length);

    let rot: number;
    let offset: Position;
    for (let i = 0; i < placements.length; i++) {
      offset = Object.assign(pat[i]);
      rot = 0;
      while (rot++ < this.rotation) {
        offset = new Position(offset.y, -offset.x);
      }
      placements[i] = new Position(pos.x + offset.x, pos.y + offset.y);
    }
    return placements;
  }

  minY(): number {
    return this.getBlockPlacements().reduce(
      (pre, cur) => new Position(0, Math.min(pre.y, cur.y)),
      new Position(0, 5)
    ).y;
  }
}
