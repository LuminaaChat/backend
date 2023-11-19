import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {GroupChatsController} from "./group-chats.controller";
import {GroupChatsService} from "./group-chats.service";
import {GroupChat, GroupChatSchema} from "./schemas/group-chat.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GroupChat.name, schema: GroupChatSchema }]),
  ],
  controllers: [GroupChatsController],
  providers: [GroupChatsService],
})
export class GroupChatsModule {}