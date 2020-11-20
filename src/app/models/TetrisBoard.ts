import { Position } from './Position';
import { TetrisBlock } from './TetrisBlock';
import { TetrisBlockPattern } from './TetrisBlockPattern';

export class TetrisBoard {
  private blockMatrix: TetrisBlock[][];

  private size: Position;

  private backgroundColor: string;

  constructor(
    size: Position = new Position(9, 15),
    backgroundColor: string = 'white'
  ) {
    this.size = size;
    this.blockMatrix = TetrisBoard.createMatrix(this.size);
    this.backgroundColor = backgroundColor;
  }

  static createMatrix(size: Position): TetrisBlock[][] {
    let matrix = new Array(size.y);
    for (let y = 0; y < matrix.length; y++) {
      matrix[y] = this.createRow(size, y);
    }
    return matrix;
  }

  static createRow(size: Position, y: number): TetrisBlock[] {
    let row: TetrisBlock[] = new Array(size.x);
    for (let x = 0; x < row.length; x++) {
      row[x] = new TetrisBlock(new Position(x, y), 'white');
    }
    return row;
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
        if (row[x].free) {
          row[x].color = this.backgroundColor;
          row[x].user = false;
        }
      }
    }
  }

  isFree(x: number, y: number) {
    if (x < 0 || y < 0 || x >= this.getWidth() || y >= this.getHeight()) {
      return false;
    }
    return this.get(x, y).free;
  }

  placeBlock(
    x: number,
    y: number,
    color: string,
    temp: boolean,
    user: boolean
  ) {
    this.blockMatrix[y][x].color = color;
    this.blockMatrix[y][x].free = temp;
    this.blockMatrix[y][x].user = user;
  }

  placePattern(pat: TetrisBlockPattern, temp: boolean) {
    const poses = pat.getBlockPlacements();
    for (let i = 0; i < poses.length; i++) {
      let pos = poses[i];
      this.placeBlock(pos.x, pos.y, pat.color, temp, temp);
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

  findCompleteYs(): number[] {
    let result: number[] = new Array();
    for (let y = 0; y < this.blockMatrix.length; y++) {
      let row = this.blockMatrix[y];
      let complete = true;
      for (let x = 0; complete && x < row.length; x++) {
        complete = row[x].free == false;
      }
      if (complete) {
        result.push(y);
      }
    }
    return result;
  }

  replaceYValues(sourceYIndex, destYIndex): void {
    let source = this.blockMatrix[sourceYIndex];
    let dest = this.blockMatrix[destYIndex];
    for (let i = 0; i < source.length; i++) {
      dest[i].color = source[i].color;
      dest[i].position = source[i].position;
      dest[i].free = source[i].free;
    }
  }

  moveYsUpOne(maxY: number, minY = 0): void {
    for (let i = maxY; i > minY; i--) {
      this.replaceYValues(i - 1, i);
    }
    this.blockMatrix[minY] = TetrisBoard.createRow(this.size, minY);
  }
}
