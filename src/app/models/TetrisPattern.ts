import { Position } from './Position';

export class TetrisPattern {
  constructor(public color: string, public pattern: Position[]) {}
}

export function getRandomPattern() {
  return TetrisPatterns[Math.floor(Math.random() * TetrisPatterns.length)];
}

export const TetrisPatterns = [
  // Straight Line
  new TetrisPattern('#00cccc', [
    new Position(0, 0),
    new Position(0, 1),
    new Position(0, 2),
    new Position(0, -1),
  ]),
  // Almost Letter +
  new TetrisPattern('purple', [
    new Position(0, 0),
    new Position(0, 1),
    new Position(1, 0),
    new Position(-1, 0),
  ]),
  // Square
  new TetrisPattern('yellow', [
    new Position(0, 0),
    new Position(0, 1),
    new Position(1, 0),
    new Position(1, 1),
  ]),
  // Letter L
  new TetrisPattern('orange', [
    new Position(0, 0),
    new Position(0, 1),
    new Position(0, -1),
    new Position(1, -1),
  ]),
  // Reverse Letter L
  new TetrisPattern('blue', [
    new Position(0, 0),
    new Position(0, 1),
    new Position(0, -1),
    new Position(-1, -1),
  ]),
  // Letter Z
  new TetrisPattern('red', [
    new Position(0, 0),
    new Position(1, 0),
    new Position(0, 1),
    new Position(-1, 1),
  ]),
  // Reverse Letter Z
  new TetrisPattern('green', [
    new Position(0, 0),
    new Position(-1, 0),
    new Position(0, 1),
    new Position(1, 1),
  ]),
];
