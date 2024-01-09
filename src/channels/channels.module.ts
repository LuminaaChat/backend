import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel, ChannelSchema } from './schemas/channel.schema';
import { Division, DivisionSchema } from '../divisions/schemas/division.schema';
import { Group, GroupSchema } from '../goups/schemas/group.schema';
import { MockCreateListener } from './listeners/mock-create.listener';
import { MockDeleteListener } from './listeners/mock-delete.listener';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Channel.name, schema: ChannelSchema },
            { name: Division.name, schema: DivisionSchema },
            { name: Group.name, schema: GroupSchema },
        ]),
    ],
    controllers: [ChannelsController],
    providers: [ChannelsService, MockCreateListener, MockDeleteListener],
})
export class ChannelsModule {}
