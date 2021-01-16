import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({ providedIn: 'root' })
export class StopGameSocketService {
  message = this.socket.fromEvent<string>('message');
  messages = this.socket.fromEvent<string[]>('messages');

  constructor(private socket: Socket) {
    console.log('socket', { socket });
    this.socket.on('msgToClient', (message) => this.receiveMessage(message));
  }

  sendMessage(msg: string) {
    console.log('sendMessage', msg);
    this.socket.emit('msgToServer', msg);
  }

  receiveMessage(message: string) {
    console.log('receiveMessage', message);
  }
}
