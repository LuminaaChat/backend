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
        owners: any;
        members: any;
        division: any;
        group: any;
    }) {
        console.log('[EVENT] [mock.create.channels] EventData');

        try {
            for (const channel of event.channels) {
                await this.service.create(event.division._id, event.group._id, {
                    name: channel.name,
                    description: channel.description,
                    color: channel.color || '#000000',
                    icon: channel.icon || 'fa fa-hashtag',
                    division: event.division._id,
                    group: event.group._id,
                    messages: [],
                    members: channel.members,
                    owners: channel.owners,
                    minRole: channel.minRole || 'client',
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
