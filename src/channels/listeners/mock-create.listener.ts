import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ChannelsService } from '../channels.service';
import { CreateChannelDto } from '../dto/create-channel.dto';

@Injectable()
export class MockCreateListener {
    constructor(private readonly service: ChannelsService) {}

    @OnEvent('mock.create.channels')
    async handleMockCreateEvent(event: {
        users: any;
        channels: any;
        members: any;
        owners: any;
        division: any;
        group: any;
    }) {
        console.log('[EVENT] [mock.create.channels] EventData');

        try {
            for (const channel of event.channels) {
                await this.service.create(event.division._id, event.group._id, {
                    name: channel.name,
                    description: channel.description,
                    color: '#000000',
                    icon: 'fa fa-users',
                    division: event.division._id,
                    group: event.group._id,
                    messages: [],
                    members: channel.members,
                    owners: channel.owners,
                    minRole: 'employee',
                    visible: true,
                } as CreateChannelDto);

                // TODO: Hier müssen noch Fake Nachrichten eingefügt werden
                // this.eventEmitter.emit('mock.create.channels', {
                //     users: event.users,
                //     division: event.division,
                //     group: event.group,
                //     channel: channel,
                // });
            }
        } catch (e) {
            console.error('[EVENT] [mock.create.channels] Fehler:');
            console.error(e);
        }
    }
}
