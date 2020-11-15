import { Component, HostListener, OnInit } from '@angular/core';
import { TetrisBoard } from '../../models/TetrisBoard';
import { TetrisBlock } from '../../models/TetrisBlock';
import { TetrisBlockPattern } from 'src/app/models/TetrisBlockPattern';
import {
  getRandomPattern,
  TetrisPattern,
  TetrisPatterns,
} from 'src/app/models/TetrisPattern';
import { Position } from 'src/app/models/Position';
import { TetrisBlockComponent } from '../tetris-block/tetris-block.component';

@Component({
  selector: 'app-tetris-board',
  templateUrl: './tetris-board.component.html',
  styleUrls: ['./tetris-board.component.css'],
})
export class TetrisBoardComponent implements OnInit {
  tetrisBoard = new TetrisBoard();

  pattern: TetrisBlockPattern;

  downInterval: any;

  constructor() {}

  ngOnInit(): void {
    this.newPattern();
  }

  getYIndices(): number[] {
    const height = this.tetrisBoard.getHeight();
    let indices = new Array(height);
    for (let i = 0; i < height; i++) {
      indices[i] = i;
    }
    return indices;
  }

  getXIndices(): number[] {
    const width = this.tetrisBoard.getWidth();
    let indices = new Array(width);
    for (let i = 0; i < width; i++) {
      indices[i] = i;
    }
    return indices;
  }

  newPattern() {
    this.pattern = new TetrisBlockPattern(
      getRandomPattern(), new Position(4,0)
    );
    let posY = Math.abs(this.pattern.minY());
    console.log(posY);
    this.pattern.position = new Position(5,posY);
    if (!this.tetrisBoard.canPlace(this.pattern)) {
      for (let x = 0; x < this.tetrisBoard.getWidth(); x++) {
        this.pattern.position = new Position(x, posY);
        if (this.tetrisBoard.canPlace(this.pattern)) {
          break;
        }
      }
      if (!this.tetrisBoard.canPlace(this.pattern)) {
        alert('game over');
        return;
      }
    }
    this.tetrisBoard.placePattern(this.pattern, true);
    this.downInterval = setInterval(this.moveDown, 2000, this);
  }

  @HostListener('document:keypress', ['$event'])
  keyPressed(event: KeyboardEvent) {
    switch (event.code) {
      case 'KeyA':
        console.log('left key');
        break;
      case 'KeyD':
        console.log('right key');
        break;
      case 'KeyS':
        console.log('down key');
        this.moveDown(this);
        break;
      case 'KeyK':
      case 'Space':
        console.log('rotate key');
        this.tetrisBoard.resetTemps();
        this.pattern.rotateClockwise();
        if (!this.tetrisBoard.canPlace(this.pattern)) {
          this.pattern.rotateCounterClockwise();
        }
        this.tetrisBoard.placePattern(this.pattern, true);
        break;
    }
    console.log(event.code);
  }

  moveDown(th: this) {
    th.tetrisBoard.resetTemps();
    th.pattern.position = new Position(
      th.pattern.position.x,
      th.pattern.position.y + 1
    );
    if (!th.tetrisBoard.canPlace(th.pattern)) {
      th.pattern.position = new Position(
        th.pattern.position.x,
        th.pattern.position.y - 1
      );
      clearInterval(th.downInterval);
      th.tetrisBoard.placePattern(th.pattern, false);
      th.newPattern();
    } else {
      th.tetrisBoard.placePattern(th.pattern, true);
    }
  }
}
