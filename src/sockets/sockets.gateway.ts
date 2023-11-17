import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {instrument} from "@socket.io/admin-ui";

@WebSocketGateway(+process.env.SOCKET_PORT, {
  cors: {
    origin: ['*', 'https://admin.socket.io'],
    credentials: true,
  },
  namespace: '/',
})
export class SocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor() {
    console.log(`Start Socket on Port ${process.env.SOCKET_PORT}`);
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }

  handleConnection(socket: Socket) {
    console.log(`[SOCKET] Client connected: ${socket.id}`);
    // console.log(`[SOCKET] SessionID: ${socket.handshake.auth.userID}`);
    // console.log(`[SOCKET] Token: ${socket.handshake.auth.token}`);
  }

  handleDisconnect(client: Socket, ...args: any[]) {
    console.log(`[SOCKET] Client disconnected: ${client.id}: ${args}`);
  }

  async afterInit() {
    instrument(this.server, {
      auth: false,
      mode: 'development',
    });
  }
}
