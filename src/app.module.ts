import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatController } from './features/chat/controller/chat.controller';
import { FcmController } from './features/fcm/controller/fcm/fcm.controller';

@Module({
    imports: [],
    controllers: [AppController, FcmController, ChatController],
    providers: [AppService],
})
export class AppModule {}
