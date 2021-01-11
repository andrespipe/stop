import { NgModule } from '@angular/core';
import { StopGameComponent } from './components/stop-game/stop-game.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: ':id',
    component: StopGameComponent,
  },
  {
    path: '',
    component: StopGameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StopGameRoutingModule {}
