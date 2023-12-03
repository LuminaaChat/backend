import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Channel, ChannelSchema} from "./schemas/channel.schema";
import {GroupCreatedListener} from "./listeners/group-created.listener";
import {Division, DivisionSchema} from "../divisions/schemas/division.schema";
import {Group, GroupSchema} from "../goups/schemas/group.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: Channel.name, schema: ChannelSchema },
        { name: Division.name, schema: DivisionSchema },
        { name: Group.name, schema: GroupSchema }
    ]),
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService, GroupCreatedListener],
})
export class ChannelsModule {}
