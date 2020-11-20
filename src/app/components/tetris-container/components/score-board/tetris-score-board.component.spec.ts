import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TetrisScoreBoardComponent } from './tetris-score-board.component';

describe('TetrisScoreBoardComponent', () => {
  let component: TetrisScoreBoardComponent;
  let fixture: ComponentFixture<TetrisScoreBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TetrisScoreBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TetrisScoreBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
