import { Injectable } from '@angular/core';
import { IMovement, IPlayer } from '@stop-game/data';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StopGameSocketService {
  socketConf: SocketIoConfig;
  socket: Socket;
  moveReporter = new BehaviorSubject<IMovement>(null);
  playerReporter = new BehaviorSubject<IPlayer>(null);

  constructor() {}

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
    this.socket.on('newPlayer', this.catchNewPlayer.bind(this));
  }

  private catchMove(move: IMovement) {
    this.moveReporter.next(move);
  }

  private catchNewPlayer(player: IPlayer) {
    this.playerReporter.next(player);
  }

  public connectGame(gameId: string) {
    this.socketConf = this.initSocketConfig(gameId);
    this.initSocket();
  }

  public sendMyMove(move: IMovement) {
    this.socket.emit('gameMove', move);
  }
}
