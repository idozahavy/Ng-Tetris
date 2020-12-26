import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { PowerUp } from '../models/PowerUp';
import { Score } from '../models/Score';
import { TetrisBlockPattern } from '../models/TetrisBlockPattern';
import { getRandomPattern } from '../models/TetrisPattern';
import { App } from 'realm';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private SERVER_URL = 'https://tetris-0e6a.restdb.io/rest/scores';
  private API_KEY = '5fe670eaff9d6706381408c6';

  eventEmitter = new EventEmitter();

  points: number = 0;
  powerUps: PowerUp[] = new Array();
  diff: number = 2;
  highScores: Score[] = [];
  ultimate: boolean = false;
  playing: boolean = false;
  nextPattern: TetrisBlockPattern;

  constructor(private server: HttpClient) {
    this.refreshHighScores();
  }

  getNextPattern(): TetrisBlockPattern {
    let result = this.nextPattern;
    if (!result) result = new TetrisBlockPattern(getRandomPattern());
    this.nextPattern = new TetrisBlockPattern(getRandomPattern());
    this.eventEmitter.emit('newPattern',this.nextPattern);
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

  sendScore(name: string) {
    const options = {
      headers: new HttpHeaders().set('x-api-key', this.API_KEY),
    };
    let score: Score = new Score(name, this.diff, this.points);
    this.server.post(this.SERVER_URL, score, options).subscribe(
      (res) => {
        this.refreshHighScores();
      },
      (err) => {
        alert('error on sending score');
        console.error("send score error",err);
      }
    );
  }

  refreshHighScores(): void {
    const options = {
      headers: new HttpHeaders().set('x-api-key', this.API_KEY),
      params: new HttpParams()
        .set('q', JSON.stringify({ diff: this.diff }))
        .set('h', JSON.stringify({ $orderby: { points: -1 } }))
        .set('max', '5'),
    };
    this.server.get<Score[]>(this.SERVER_URL, options).subscribe(
      (res) => {
        this.highScores = res;
      },
      (err) => console.error(err)
    );
  }
}
