import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopGameComponent } from './components/stop-game/stop-game.component';
import { StopGameRoutingModule } from './stop-game-routing.module';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// const socketConfig: SocketIoConfig = {
//   url: 'http://localhost:3334',
//   options: {},
// };
@NgModule({
  declarations: [StopGameComponent],
  imports: [
    CommonModule,
    StopGameRoutingModule,
    // SocketIoModule.forRoot(socketConfig),
  ],
})
export class StopGameModule {}
