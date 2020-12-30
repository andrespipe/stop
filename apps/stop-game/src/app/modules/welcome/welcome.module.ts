import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { NewGameComponent } from './components/new-game/new-game.component';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { HallOfFameComponent } from './components/hall-of-fame/hall-of-fame.component';


@NgModule({
  declarations: [WelcomeComponent, NewGameComponent, JoinGameComponent, HallOfFameComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
  ]
})
export class WelcomeModule { }
