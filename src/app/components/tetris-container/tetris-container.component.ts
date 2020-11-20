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
    if (this.game.playing){
      // alert("you are already playing the game");
      return;
    }
    this.game.resetGame();
    this.tetrisBoard.resetGame();
    this.tetrisBoard.startGame();
  }
}