import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GroupsService } from '../groups.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { Division } from '../../divisions/schemas/division.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group } from "../schemas/group.schema";

@Injectable()
export class DivisionCreatedListener {
    @InjectModel(Division.name)
    private readonly divisionModel: Model<Division>;

    constructor(private readonly groupsService: GroupsService) {}

    @OnEvent('division.created')
    async handleDivisionCreatedEvent(divisionId: string) {
        console.log('[EVENT] [division.created] DivisionID:', divisionId);
        try {
            const division = await this.divisionModel.findOne({
                _id: divisionId,
            });

            const group = await this.groupsService.create({
                name: 'Allgemein',
                color: division.color,
                icon: division.icon,
                division: division._id,
                members: division.members,
                owners: division.owners,
                minRole: division.minRole,
                visible: division.visible
            } as any);

            division.groups.push(group);
            division.save();
        } catch (e) {
            console.error('[EVENT] [division.created] Fehler:');
            console.error(e);
        }
    }
}
