import { Component, Input, OnInit } from '@angular/core';
import { TetrisBlock } from 'src/app/models/TetrisBlock';

@Component({
  selector: 'app-tetris-block',
  templateUrl: './tetris-block.component.html',
  styleUrls: ['./tetris-block.component.css']
})
export class TetrisBlockComponent implements OnInit {

  @Input()
  block: TetrisBlock;

  constructor() { }

  ngOnInit(): void {
  }

}
