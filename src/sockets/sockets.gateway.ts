import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer, WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {instrument} from "@socket.io/admin-ui";
import {SocketMessage} from "./models/socketMessage";

@WebSocketGateway(+process.env.SOCKET_PORT, {
  cors: {
    origin: ['*', 'localhost', 'https://admin.socket.io'],
    // credentials: true,
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

  @SubscribeMessage('messages:new')
  handleMessagesNew(@MessageBody() data: unknown): WsResponse<unknown> {
    const event = 'messages:new';
    return { event, data };
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
