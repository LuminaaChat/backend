import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { MockDeleteListener } from './listeners/mock-delete.listener';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Message.name, schema: MessageSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    controllers: [MessagesController],
    providers: [MessagesService, MockDeleteListener],
})
export class MessagesModule {}
