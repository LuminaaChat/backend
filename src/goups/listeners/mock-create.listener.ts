import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { GroupsService } from '../groups.service';
import { CreateGroupDto } from '../dto/create-group.dto';

@Injectable()
export class MockCreateListener {
    constructor(
        private readonly service: GroupsService,
        private eventEmitter: EventEmitter2,
    ) {}

    @OnEvent('mock.create.groups')
    async handleMockCreateEvent(event: {
        users: any;
        groups: any;
        division: any;
    }) {
        console.log('[EVENT] [mock.create.groups] EventData');

        try {
            for (const group of event.groups) {
                await this.service.create(event.division._id, {
                    name: group.name,
                    description: group.description,
                    color: '#000000',
                    icon: 'fa fa-users',
                    division: event.division._id,
                    channels: [],
                    members: group.members,
                    owners: group.owners,
                    minRole: 'employee',
                    visible: true,
                } as CreateGroupDto);

                this.eventEmitter.emit('mock.create.channels', {
                    users: event.users,
                    division: event.division,
                    group: group,
                    channels: group.channels,
                });
            }
        } catch (e) {
            console.error('[EVENT] [mock.create.groups] Fehler:');
            console.error(e);
        }
    }
}
