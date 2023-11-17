import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FcmController } from './features/fcm/controller/fcm.controller';
import { ChatController } from './features/chat/controller/chat.controller';

@Module({
  imports: [],
  controllers: [AppController, FcmController, ChatController],
  providers: [AppService],
})
export class AppModule {}
