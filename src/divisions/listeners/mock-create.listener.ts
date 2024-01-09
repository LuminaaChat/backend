import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { DivisionsService } from '../divisions.service';
import { CreateDivisionDto } from '../dto/create-division.dto';

@Injectable()
export class MockCreateListener {
    constructor(
        private readonly service: DivisionsService,
        private eventEmitter: EventEmitter2,
    ) {}

    @OnEvent('mock.create.divisions')
    async handleMockCreateEvent(event: { users: any }) {
        console.log('[EVENT] [mock.create.divisions] EventData');
        try {
            // const divisionAmbulant = await this.service.create({
            //     name: 'Ambulant',
            //     description: 'Demo Bereich: Ambulant',
            //     color: '#000000',
            //     icon: 'fa fa-users',
            //     members: [
            //         event.users.demoUserJohn,
            //         event.users.demoUserTim,
            //         event.users.demoUserUte,
            //     ],
            //     owners: [event.users.demoUserJohn, event.users.demoUserBeate],
            //     minRole: 'employee',
            //     visible: true,
            // } as CreateDivisionDto);
            //
            // this.eventEmitter.emit('mock.create.groups', {
            //     users: event.users,
            //     members: [
            //         event.users.demoUserJohn,
            //         event.users.demoUserTim,
            //         event.users.demoUserUte,
            //     ],
            //     owners: [
            //         event.users.demoUserJohn,
            //         event.users.demoUserBeate,
            //         event.users.demoUserFrank,
            //     ],
            //     division: divisionAmbulant,
            // });

            const divisionStationaer = await this.service.create({
                name: 'Stationär',
                description: 'Demo Bereich: Stationär',
                color: '#000000',
                icon: 'fa fa-users',
                members: [
                    event.users.demoUserJohn,
                    event.users.demoUserTim,
                    event.users.demoUserUte,
                    event.users.demoUserJenny,
                    event.users.demoUserTim,
                ],
                owners: [event.users.demoUserJohn, event.users.demoUserBeate],
                minRole: 'employee',
                visible: true,
            } as CreateDivisionDto);

            this.eventEmitter.emit('mock.create.groups', {
                users: event.users,
                groups: [
                    {
                        name: 'Intern',
                        description:
                            'Austausch für die Mitarbeiter im Stationären Bereich',
                        channels: [
                            {
                                name: 'Allgemein',
                                description: 'Allgemeiner Chat',
                                owners: [
                                    event.users.demoUserJohn,
                                    event.users.demoUserHolger,
                                ],
                                members: [
                                    event.users.demoUserJohn,
                                    event.users.demoUserHolger,
                                    event.users.demoUserFrank,
                                    event.users.demoUserUte,
                                ],
                            },
                            {
                                name: 'Diensttausch',
                                description: 'Chat für Diensttausch',
                                owners: [
                                    event.users.demoUserJohn,
                                    event.users.demoUserHolger,
                                ],
                                members: [
                                    event.users.demoUserJohn,
                                    event.users.demoUserHolger,
                                    event.users.demoUserFrank,
                                    event.users.demoUserUte,
                                ],
                            },
                            {
                                name: 'Besonderheiten',
                                description: 'Chat für Besonderheiten',
                                owners: [
                                    event.users.demoUserJohn,
                                    event.users.demoUserHolger,
                                ],
                                members: [
                                    event.users.demoUserJohn,
                                    event.users.demoUserHolger,
                                    event.users.demoUserFrank,
                                    event.users.demoUserUte,
                                ],
                            },
                        ],
                        owners: [
                            event.users.demoUserJohn,
                            event.users.demoUserHolger,
                        ],
                        members: [
                            event.users.demoUserJohn, // Admin
                            event.users.demoUserHolger, // TeamLead
                            event.users.demoUserFrank, // Employee: WHG1
                            event.users.demoUserUte, // Employee: WHG2
                        ],
                    },
                    {
                        name: 'WHG1',
                        description: 'Wohngruppe 1',
                        channels: [
                            {
                                name: 'Allgemein',
                                description: 'Allgemeiner Chat',
                                owners: [
                                    event.users.demoUserJohn,
                                    event.users.demoUserHolger,
                                    event.users.demoUserFrank,
                                ],
                                members: [
                                    event.users.demoUserJohn,
                                    event.users.demoUserHolger,
                                    event.users.demoUserFrank,
                                    event.users.demoUserJenny,
                                ],
                            },
                        ],
                        owners: [
                            event.users.demoUserJohn,
                            event.users.demoUserHolger,
                        ],
                        members: [
                            event.users.demoUserJohn, // Admin
                            event.users.demoUserHolger, // TeamLead
                            event.users.demoUserFrank, // Employee: WHG1
                            event.users.demoUserJenny, // Client: WHG1
                        ],
                    },
                    {
                        name: 'WHG2',
                        description: 'Wohngruppe 2',
                        channels: [
                            {
                                name: 'Allgemein',
                                description: 'Allgemeiner Chat',
                                owners: [
                                    event.users.demoUserJohn,
                                    event.users.demoUserHolger,
                                    event.users.demoUserUte,
                                ],
                                members: [
                                    event.users.demoUserJohn,
                                    event.users.demoUserHolger,
                                    event.users.demoUserUte,
                                    event.users.demoUserTim,
                                ],
                            },
                        ],
                        owners: [
                            event.users.demoUserJohn,
                            event.users.demoUserHolger,
                        ],
                        members: [
                            event.users.demoUserJohn, // Admin
                            event.users.demoUserHolger, // TeamLead
                            event.users.demoUserUte, // Employee: WHG2
                            event.users.demoUserTim, // Client: WHG2
                        ],
                    },
                ],
                members: [
                    event.users.demoUserJohn,
                    event.users.demoUserTim,
                    event.users.demoUserUte,
                    event.users.demoUserJenny,
                    event.users.demoUserTim,
                ],
                owners: [event.users.demoUserJohn, event.users.demoUserBeate],
                division: divisionStationaer,
            });
        } catch (e) {
            console.error('[EVENT] [mock.create.divisions] Fehler:');
            console.error(e);
        }
    }
}
