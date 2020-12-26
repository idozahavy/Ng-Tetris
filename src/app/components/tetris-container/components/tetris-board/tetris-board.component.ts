import { Component, HostListener, Input, OnInit } from '@angular/core';
import { TetrisBlockPattern } from 'src/app/models/TetrisBlockPattern';
import { getRandomPattern } from 'src/app/models/TetrisPattern';
import { Position } from 'src/app/models/Position';
import { TetrisBoard } from 'src/app/models/TetrisBoard';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-tetris-board',
  templateUrl: './tetris-board.component.html',
  styleUrls: ['./tetris-board.component.css'],
})
export class TetrisBoardComponent implements OnInit {
  board: TetrisBoard;
  pattern: TetrisBlockPattern;
  downInterval: number;
  speed: number; // more is faster

  constructor(public game: GameService) {}

  ngOnInit(): void {
    this.resetGame();
  }

  getYIndices(): number[] {
    const height = this.board.getHeight();
    let indices = new Array(height);
    for (let i = 0; i < height; i++) {
      indices[i] = i;
    }
    return indices;
  }

  getXIndices(): number[] {
    const width = this.board.getWidth();
    let indices = new Array(width);
    for (let i = 0; i < width; i++) {
      indices[i] = i;
    }
    return indices;
  }

  resetGame() {
    this.board = new TetrisBoard();
    this.stopDownInterval();
    this.speed =
      0.13 * Math.pow(this.game.diff, 2) - 0.314 * this.game.diff + 10.2;
  }

  startGame() {
    this.game.playing = true;
    this.newPattern();
  }

  checkBoard() {
    const completedYs = this.board.findCompleteYs();
    if (completedYs.length > 0) {
      this.scaleUpSpeed();
    }
    for (let i = 0; i < completedYs.length; i++) {
      this.board.moveYsUpOne(completedYs[i]);
      this.game.points += 20 + i * 10;
    }
    if (this.game.ultimate || window['ultimate'] == 'Ultimate Tetris') {
      this.board.moveYsUpOne(14);
    }
  }

  scaleUpSpeed() {
    this.speed += 0.01 * Math.pow(this.game.diff, 2) + this.game.diff / 5 - 0.1;
    const minSpeed = 9.4 * this.game.diff + 30.5;
    if (this.speed > minSpeed) {
      this.speed = minSpeed;
    }
    console.log(`speed = ${this.speed}, delay = ${10000.0 / this.speed}, `);
  }

  startDownInterval() {
    this.downInterval = window.setInterval(
      this.moveDown,
      10000.0 / this.speed,
      this
    );
  }

  stopDownInterval() {
    window.clearInterval(this.downInterval);
  }

  newPattern() {
    this.stopDownInterval();
    this.checkBoard();
    this.pattern = this.game.getNextPattern();
    console.log("game new pattern", this.pattern);
    
    let posY = Math.abs(this.pattern.minY());
    this.pattern.position = new Position(4, posY);
    if (!this.board.canPlace(this.pattern)) {
      let name = prompt("Game Over - enter your name to show on the scoreboard");
      if (name){
        this.game.sendScore(name);
      }
      this.game.playing = false;
      return;
    }
    this.board.placePattern(this.pattern, true);
    this.startDownInterval();
  }

  @HostListener('document:keypress', ['$event'])
  keyPressed(event: KeyboardEvent) {
    if (!this.game.playing) return;
    switch (event.code) {
      case 'KeyA':
        this.keyLeftPress();
        break;
      case 'KeyD':
        this.keyRightPress();
        break;
      case 'KeyS':
        this.keyDownPress();
        break;
      case 'KeyK':
        this.keyRotatePress();
        break;
    }
    // console.log(event.code);
  }

  movePattern(dx, dy, temp = true): boolean {
    this.pattern.position.moveBy(dx, dy);
    if (!this.board.canPlace(this.pattern)) {
      this.pattern.position.moveBy(-dx, -dy);
      return false;
    }
    this.board.resetTemps();
    this.board.placePattern(this.pattern, temp);
    return true;
  }

  moveDown(th: this) {
    if (!th.movePattern(0, 1)) {
      th.movePattern(0, 0, false);
      th.newPattern();
    }
  }

  public keyDownPress() {
    // console.log('down key');
    if (!this.movePattern(0, 1)) {
      this.movePattern(0, 0, false);
      this.newPattern();
    } else {
      this.stopDownInterval();
      this.startDownInterval();
    }
  }

  public keyRotatePress() {
    // console.log('rotate key');
    this.pattern.rotateClockwise();
    if (!this.board.canPlace(this.pattern)) {
      this.pattern.rotateCounterClockwise();
      return;
    }
    this.board.resetTemps();
    this.board.placePattern(this.pattern, true);
  }

  public keyLeftPress() {
    // console.log('left key');
    this.movePattern(-1, 0);
  }

  public keyRightPress() {
    // console.log('right key');
    this.movePattern(1, 0);
  }
}
