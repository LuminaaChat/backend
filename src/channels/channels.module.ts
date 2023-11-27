import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Channel, ChannelSchema} from "./schemas/channel.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService],
})
export class ChannelsModule {}
