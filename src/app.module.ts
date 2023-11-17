import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import {UsersModule} from "./user/user.module";

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
        UsersModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}