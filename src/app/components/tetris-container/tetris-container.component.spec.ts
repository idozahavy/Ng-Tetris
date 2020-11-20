import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TetrisContainerComponent } from './tetris-container.component';

describe('TetrisContainerComponent', () => {
  let component: TetrisContainerComponent;
  let fixture: ComponentFixture<TetrisContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TetrisContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TetrisContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
