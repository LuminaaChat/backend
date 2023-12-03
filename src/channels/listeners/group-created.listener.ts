import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Division} from "../../divisions/schemas/division.schema";
import {Model} from "mongoose";
import {ChannelsService} from "../channels.service";
import {Group} from "../../goups/schemas/group.schema";
import {OnEvent} from "@nestjs/event-emitter";
import {CreateChannelDto} from "../dto/create-channel.dto";

class GroupCreatedEvent {
    divisionId: string;
    groupId: string;
}

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
            const division = await this.divisionModel.findOne({ _id: event.divisionId });
            const group = await this.groupModel.findOne({ _id: event.groupId });

            const newChannel = new CreateChannelDto();
            newChannel.name = 'Allgemein';
            newChannel.description = 'Ein Channel für alle';
            newChannel.color = group.color;
            newChannel.icon = group.icon;
            newChannel.division = division._id;
            // @ts-ignore
            newChannel.members = group.members;
            // @ts-ignore
            newChannel.owners = group.owners;
            newChannel.minRole = group.minRole;
            newChannel.visible = group.visible;

            const channel = await this.channelsService.create(newChannel);
            group.channels.push(channel);
            group.save();
        } catch (e) {
            console.error('[EVENT] [group.created] Fehler:');
            console.error(e);
        }
    }
}