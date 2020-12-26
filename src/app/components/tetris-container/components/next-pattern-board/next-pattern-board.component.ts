import { Component, OnInit } from '@angular/core';
import { Position } from 'src/app/models/Position';
import { TetrisBlockPattern } from 'src/app/models/TetrisBlockPattern';
import { TetrisBoard } from 'src/app/models/TetrisBoard';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-next-pattern-board',
  templateUrl: './next-pattern-board.component.html',
  styleUrls: ['./next-pattern-board.component.css'],
})
export class NextPatternBoardComponent implements OnInit {
  board: TetrisBoard = new TetrisBoard(new Position(5, 5));
  pattern: TetrisBlockPattern;

  constructor(public game: GameService) {}

  ngOnInit(): void {
    this.game.eventEmitter.on('newPattern', (nextPattern: TetrisBlockPattern) => {
      this.pattern = nextPattern;
      this.pattern.position = new Position(2,2);
      this.board.resetTemps();
      console.log("new next pattern",this.pattern);
      this.board.placePattern(this.pattern,true);
    });
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
}
