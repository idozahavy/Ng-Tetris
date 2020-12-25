import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TetrisContainerComponent } from './components/tetris-container/tetris-container.component';
import { TetrisBoardComponent } from './components/tetris-container/components/tetris-board/tetris-board.component';
import { TetrisScoreBoardComponent } from './components/tetris-container/components/score-board/tetris-score-board.component';
import { TetrisBlockComponent } from './components/tetris-container/components/tetris-block/tetris-block.component';
import { NextPatternBoardComponent } from './components/tetris-container/components/next-pattern-board/next-pattern-board.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TetrisBoardComponent,
    TetrisBlockComponent,
    TetrisContainerComponent,
    TetrisScoreBoardComponent,
    NextPatternBoardComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
