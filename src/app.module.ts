import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import {UserModule} from "./user/user.module";
import { MessagesModule } from './messages/messages.module';
import { MessageArchModule } from './arch/arch.module';
import {SocketsModule} from "./sockets/sockets.module";
import { RoomsModule } from './rooms/rooms.module';
import { RolesModule } from './roles/roles.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(
            `${process.env.MONGO_DB_URL}:${process.env.MONGO_DB_PORT}`,
            {
                dbName: process.env.MONGO_DB_DATABASE,
                auth: {
                    username: process.env.MONGO_DB_ROOT_USER,
                    password: process.env.MONGO_DB_ROOT_PASSWORD,
                },
                autoCreate: true,
            },
        ),
        UserModule,
        AuthModule,
        MessagesModule,
        MessageArchModule,
        SocketsModule,
        RoomsModule,
        RolesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}