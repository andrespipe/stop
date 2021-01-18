import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopGameComponent } from './components/stop-game/stop-game.component';
import { StopGameRoutingModule } from './stop-game-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [StopGameComponent],
  imports: [
    CommonModule,
    StopGameRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class StopGameModule {}
