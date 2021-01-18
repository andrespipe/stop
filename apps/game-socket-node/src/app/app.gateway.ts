import { Logger } from '@nestjs/common';

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('AppGateway');

  handleConnection(client: Socket, ...args: any[]) {
    const gameId = this.getGameId(client);
    this.logger.log(`Client connected: ${client.id} - Room ${gameId}`);
    client.join(gameId);
  }

  @SubscribeMessage('gameMove')
  handleGameMove(client: Socket, payload: any): void {
    const gameId = this.getGameId(client);
    this.logger.log(`Room ${gameId} gameMove ${JSON.stringify(payload)}`);
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
