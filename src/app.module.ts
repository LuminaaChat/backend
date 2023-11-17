import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesGateway } from './messages/messages.gateway';
import { FcmModule } from './fcm/fcm.module';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [FcmModule, ChatModule, UserModule, AuthModule],
    controllers: [AppController],
    providers: [AppService, MessagesGateway],
})
export class AppModule {}
