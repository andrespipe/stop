import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { NewGameComponent } from './components/new-game/new-game.component';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { HallOfFameComponent } from './components/hall-of-fame/hall-of-fame.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JoinGameFormComponent } from './components/join-game-form/join-game-form.component';

@NgModule({
  declarations: [
    WelcomeComponent,
    NewGameComponent,
    JoinGameComponent,
    HallOfFameComponent,
    JoinGameFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WelcomeRoutingModule,
  ],
})
export class WelcomeModule {}
