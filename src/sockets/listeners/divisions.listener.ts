import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class DivisionsListener {
    @OnEvent('division.created')
    async handleDivisionCreatedEvent(event: any) {
        try {
            console.log(
                '[SOCKETS] [EVENTS] [DivisionsListener] division.created',
                event,
            );
        } catch (e) {
            console.error(e);
        }
    }
}
