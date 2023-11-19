import { Allow, MinLength } from 'class-validator';

export class SocketMessage {
    @MinLength(2)
    chatId: string;

    @MinLength(2)
    authorId: string;

    @MinLength(1)
    message: string;

    @Allow()
    timestamp: Date;
}
