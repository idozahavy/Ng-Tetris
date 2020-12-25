import { Component, OnInit, ViewChild } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { TetrisBoardComponent } from './components/tetris-board/tetris-board.component';

@Component({
  selector: 'app-tetris-container',
  templateUrl: './tetris-container.component.html',
  styleUrls: ['./tetris-container.component.css'],
})
export class TetrisContainerComponent implements OnInit {
  @ViewChild(TetrisBoardComponent) tetrisBoard: TetrisBoardComponent;

  constructor(public game: GameService) {}

  ngOnInit(): void {}

  getScore() {
    return this.game.points;
  }

  startGame() {
    if (this.game.playing) {
      // alert("you are already playing the game");
      return;
    }
    this.game.resetGame();
    this.tetrisBoard.resetGame();
    this.tetrisBoard.startGame();
  }

  touchStart: any;
  swipeThreshold: number = 15;
  touchEnd(e) {
    // console.log(e);

    var xLen = e.changedTouches[0].clientX - this.touchStart.touches[0].clientX;
    var yLen = e.changedTouches[0].clientY - this.touchStart.touches[0].clientY;

    if (Math.abs(xLen) > Math.abs(yLen)) {
      if (xLen > this.swipeThreshold) return this.moveRight();
      if (xLen < -this.swipeThreshold) return this.moveLeft();
    } else {
      if (yLen > this.swipeThreshold) return this.moveDown();
      if (yLen < -this.swipeThreshold) return this.rotate();
    }
  }

  moveLeft() {
    if (!this.tetrisBoard.pattern) return;
    this.tetrisBoard.keyLeftPress();
  }

  rotate() {
    if (!this.tetrisBoard.pattern) return;
    this.tetrisBoard.keyRotatePress();
  }

  moveRight() {
    if (!this.tetrisBoard.pattern) return;
    this.tetrisBoard.keyRightPress();
  }

  moveDown() {
    if (!this.tetrisBoard.pattern) return;
    this.tetrisBoard.keyDownPress();
  }
}
