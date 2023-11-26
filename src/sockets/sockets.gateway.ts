import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { SocketMessage } from './models/socketMessage';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@WebSocketGateway({
    cors: {
        origin: [
            '*',
            'localhost',
            'https://admin.socket.io',
        ],
        transports: ['websocket'],
        credentials: true,
    },
})
export class SocketsGateway
    implements OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        console.log(`------------------------`);
        console.log(`[SOCKET] Client connected: ${client.id}`);
        //console.log(socket);
        console.log(`[SOCKET] Token: ${client.handshake?.auth?.token}`);
        console.log(`[SOCKET] User ID: ${client.handshake?.auth?.userID}`);
        console.log(`[SOCKET] User Name: ${client.handshake?.auth?.userName}`);
    }

    handleDisconnect(client: Socket, ...args: any[]) {
        console.log(`[SOCKET] Client disconnected: ${client.id}: ${args}`);
        console.log(`------------------------`);
    }

    async afterInit() {
        instrument(this.server, {
            auth: false,
            mode: 'development',
        });
    }

    @SubscribeMessage('chat_message')
    @UsePipes(
        new ValidationPipe({
            whitelist: true,
        }),
    )
    handleMessagesNew(
        @MessageBody() data: SocketMessage,
        @ConnectedSocket() socket: Socket,
    ): WsResponse<unknown> {
        console.log(data);
        const event = 'chat_message';
        socket.broadcast.emit(event, data);
        return { event, data };
    }


}

// 6558fac3bb529d4a188f99a1 J. Doe
// 6558fb27bb529d4a188f99a3 Em. Ployee
