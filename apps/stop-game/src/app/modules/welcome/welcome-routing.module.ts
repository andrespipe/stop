import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { HallOfFameComponent } from './components/hall-of-fame/hall-of-fame.component';

const routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'new-game',
    component: NewGameComponent,
  },
  {
    path: 'join-game',
    component: JoinGameComponent,
  },
  {
    path: 'hall-of-fame',
    component: HallOfFameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule {}
