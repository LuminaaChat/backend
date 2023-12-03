import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {GroupsService} from "../groups.service";
import {CreateGroupDto} from "../dto/create-group.dto";
import {Division} from "../../divisions/schemas/division.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class DivisionCreatedListener {

    @InjectModel(Division.name)
    private readonly divisionModel: Model<Division>;

    constructor(private readonly groupsService: GroupsService) {}

    @OnEvent('division.created')
    async handleDivisionCreatedEvent(divisionId: string) {
        console.log('[EVENT] [division.created] DivisionID:', divisionId);
        try {
            const division = await this.divisionModel.findOne({ _id: divisionId });

            const newGroup = new CreateGroupDto();
            newGroup.name = 'Allgemein';
            newGroup.color = division.color;
            newGroup.icon = division.icon;
            newGroup.division = division._id;
            // @ts-ignore
            newGroup.members = division.members;
            // @ts-ignore
            newGroup.owners = division.owners;
            newGroup.minRole = division.minRole;
            newGroup.visible = division.visible;

            const group = await this.groupsService.create(newGroup);
            division.groups.push(group);
            division.save();
        } catch (e) {
            console.error('[EVENT] [division.created] Fehler:');
            console.error(e);
        }
    }
}