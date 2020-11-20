import { Component, OnInit } from '@angular/core';
import { Score } from 'src/app/models/Score';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-tetris-score-board',
  templateUrl: './tetris-score-board.component.html',
  styleUrls: ['./tetris-score-board.component.css'],
})
export class TetrisScoreBoardComponent implements OnInit {
  constructor(public game: GameService) {}

  ngOnInit(): void {
    this.getHighScores();
  }

  getGameScore() {
    return this.game.points;
  }

  getHighScores(): Score[] {
    return this.game.highScores;
  }
}
