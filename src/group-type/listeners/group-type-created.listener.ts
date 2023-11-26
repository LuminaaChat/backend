import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {GroupTypeCreatedEvent} from "../events/group-type-created.event";

@Injectable()
export class GroupTypeCreatedListener {
    @OnEvent('group-type.created')
    handleOrderCreatedEvent(event: GroupTypeCreatedEvent) {
        // handle and process "OrderCreatedEvent" event
        console.log(event);
    }
}