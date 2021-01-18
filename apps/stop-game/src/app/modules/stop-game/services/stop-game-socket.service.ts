import { Injectable } from '@angular/core';
import { IMovement } from '@stop-game/data';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StopGameSocketService {
  socketConf: SocketIoConfig;
  socket: Socket;
  moveReporter = new BehaviorSubject<IMovement>(null);

  constructor() {}

  public connectGame(gameId: string) {
    this.socketConf = this.initSocketConfig(gameId);
    this.initSocket();
  }

  private initSocketConfig(gameId: string): SocketIoConfig {
    return {
      url: `http://localhost:3334`,
      options: {
        query: { gameId },
      },
    };
  }

  private initSocket() {
    this.socket = new Socket(this.socketConf);
    this.socket.on('newGameMove', this.catchMove.bind(this));
  }

  sendMyMove(move: IMovement) {
    this.socket.emit('gameMove', move);
  }

  catchMove(move: IMovement) {
    this.moveReporter.next(move);
    console.log({ move });
    // const moveObj = JSON.parse(move);
    // console.log('moveObj', { move, moveObj });
    // const movement: IMovement = {
    //   move: moveObj.move,
    //   nickName: moveObj.nickName,
    //   round: moveObj.round,
    // };
    // this.moveReporter.next(movement);
  }
}
