import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Division } from '../../divisions/schemas/division.schema';
import { Model } from 'mongoose';
import { ChannelsService } from '../channels.service';
import { Group } from '../../goups/schemas/group.schema';
import { OnEvent } from '@nestjs/event-emitter';
import { GroupCreatedEvent } from '../../goups/events/group-created.event';

@Injectable()
export class GroupCreatedListener {
    @InjectModel(Division.name)
    private readonly divisionModel: Model<Division>;

    @InjectModel(Group.name)
    private readonly groupModel: Model<Group>;

    constructor(private readonly channelsService: ChannelsService) {}

    @OnEvent('group.created')
    async handleGroupCreatedEvent(event: GroupCreatedEvent) {
        console.log('[EVENT] [group.created] EventData: ', event);
        try {
            const division = await this.divisionModel.findOne({
                _id: event.divisionId,
            });
            const group = await this.groupModel.findOne({ _id: event.groupId });
            const channel = await this.channelsService.create(
                division._id,
                group._id,
                {
                    name: 'Allgemein',
                    color: group.color,
                    icon: group.icon,
                    division: division._id,
                    members: group.members,
                    owners: group.owners,
                    minRole: group.minRole,
                    visible: group.visible,
                } as any,
            );
            group.channels.push(channel);
            group.save();
        } catch (e) {
            console.error('[EVENT] [group.created] Fehler:');
            console.error(e);
        }
    }
}
