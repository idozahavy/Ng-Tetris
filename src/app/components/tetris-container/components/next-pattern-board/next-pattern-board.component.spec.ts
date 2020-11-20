import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextPatternBoardComponent } from './next-pattern-board.component';

describe('NextPatternBoardComponent', () => {
  let component: NextPatternBoardComponent;
  let fixture: ComponentFixture<NextPatternBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextPatternBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextPatternBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
