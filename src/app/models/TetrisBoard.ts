import { Position } from './Position';
import { TetrisBlock } from './TetrisBlock';
import { TetrisBlockPattern } from './TetrisBlockPattern';

export class TetrisBoard {
  private blockMatrix: TetrisBlock[][];

  private backgroundColor: string;

  constructor() {
    this.blockMatrix = new Array(15);
    for (let y = 0; y < this.blockMatrix.length; y++) {
      this.blockMatrix[y] = new Array(9);
      let row = this.blockMatrix[y];
      for (let x = 0; x < row.length; x++) {
        row[x] = new TetrisBlock(new Position(x, y), 'white');
      }
    }
  }

  get(x: number, y: number) {
    return this.blockMatrix[y][x];
  }

  private width_cache: number;
  getWidth(): number {
    if (this.width_cache) return this.width_cache;
    let width = Number.MIN_SAFE_INTEGER;
    for (let xIndex in this.blockMatrix) {
      let row = this.blockMatrix[xIndex];
      width = Math.max(width, row.length);
    }
    this.width_cache = width;
    return width;
  }

  getHeight(): number {
    return this.blockMatrix.length;
  }

  resetTemps() {
    for (let y = 0; y < this.blockMatrix.length; y++) {
      let row = this.blockMatrix[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x].temp) {
          row[x].color = this.backgroundColor;
        }
      }
    }
  }

  isFree(x: number, y: number) {
    if (x >= this.getWidth() || y >= this.getHeight()) {
      return false;
    }
    return this.get(x, y).temp;
  }

  placeBlock(x: number, y: number, color: string, temp: boolean) {
    this.blockMatrix[y][x].color = color;
    this.blockMatrix[y][x].temp = temp;
  }

  placePattern(pat: TetrisBlockPattern, temp: boolean) {
    const poses = pat.getBlockPlacements();
    for (let i = 0; i < poses.length; i++) {
      let pos = poses[i];
      this.placeBlock(pos.x, pos.y, pat.pattern.color, temp);
    }
  }

  canPlace(pat: TetrisBlockPattern) {
    const poses = pat.getBlockPlacements();
    for (let i = 0; i < poses.length; i++) {
      let pos = poses[i];
      if (!this.isFree(pos.x, pos.y)) {
        return false;
      }
    }
    return true;
  }
}
