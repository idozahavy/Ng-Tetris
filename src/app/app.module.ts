import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TetrisBoardComponent } from './components/tetris-board/tetris-board.component';
import { TetrisBlockComponent } from './components/tetris-block/tetris-block.component';

@NgModule({
  declarations: [
    AppComponent,
    TetrisBoardComponent,
    TetrisBlockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
