import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopGameComponent } from './components/stop-game/stop-game.component';
import { StopGameRoutingModule } from './stop-game-routing.module';

@NgModule({
  declarations: [StopGameComponent],
  imports: [CommonModule, StopGameRoutingModule],
})
export class StopGameModule {}
