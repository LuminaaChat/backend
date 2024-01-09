import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MessagesService } from '../messages.service';

@Injectable()
export class MockDeleteListener {
    constructor(private readonly service: MessagesService) {}

    @OnEvent('mock.delete')
    async handleMockDeleteEvent() {
        console.log('[EVENT] [mock.delete.messages] EventData');
        try {
            // Delete Demo Messages
            await this.service.deleteAll();
        } catch (e) {
            console.error('[EVENT] [mock.delete.messages] Fehler:');
            console.error(e);
        }
    }
}
