import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { PowerUp } from '../models/PowerUp';
import { Score } from '../models/Score';
import { TetrisBlockPattern } from '../models/TetrisBlockPattern';
import { getRandomPattern, TetrisPattern } from '../models/TetrisPattern';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private serverUrl = 'http://localhost:8080/';
  
  eventEmitter = new EventEmitter();

  points: number = 0;
  powerUps: PowerUp[] = new Array();
  diff: number = 2;
  highScores: Score[];
  ultimate: boolean = false;
  playing: boolean = false;
  nextPattern: TetrisBlockPattern;

  constructor(private server: HttpClient) {
    // this.refreshHighScores();
  }

  getNextPattern(): TetrisBlockPattern {
    let result = this.nextPattern;
    if (!result) result = new TetrisBlockPattern(getRandomPattern());
    this.nextPattern = new TetrisBlockPattern(getRandomPattern());
    this.eventEmitter.emit('newPattern');
    return result;
  }

  resetPoints() {
    this.points = 0;
  }

  resetGame() {
    this.resetPoints();
    this.playing = false;
    this.nextPattern = null;
  }

  sendScore(name: string, diff: number) {
    let score: Score = new Score(name, diff, this.points);
    this.server.post(this.serverUrl + 'score', score).subscribe(
      (res) => {
        console.log('res', res);
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  refreshHighScores(): void {
    this.server.get<Score[]>(this.serverUrl + 'scores/' + this.diff).subscribe(
      (res) => (this.highScores = res),
      (err) => console.error(err)
    );
  }
}
