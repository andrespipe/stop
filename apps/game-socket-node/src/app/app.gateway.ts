import { HttpService, Logger } from '@nestjs/common';

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IMovement } from '@stop-game/data';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private http: HttpService) {}

  private logger: Logger = new Logger('AppGateway');

  handleConnection(client: Socket, ...args: any[]) {
    const gameId = this.getGameId(client);
    this.logger.log(`Client connected: ${client.id} - Room ${gameId}`);
    client.join(gameId);
  }

  @SubscribeMessage('gameMove')
  handleGameMove(client: Socket, payload: IMovement): void {
    const gameId = this.getGameId(client);
    this.logger.log(`Room ${gameId} gameMove ${JSON.stringify(payload)}`);
    const { nickName, round } = payload;
    this.http
      .put(
        `http://loclahost:3333/${gameId}/player/${nickName}/movement/${round}`,
        payload,
      )
      .subscribe((ans) => {
        console.log('updatedMovement', ans);
      });
    this.server.to(gameId).emit('newGameMove', payload);
  }

  afterInit(server: Server) {
    this.logger.log(`Init ${server}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  private getGameId(client: Socket): string {
    return client.handshake.query.gameId;
  }
}
