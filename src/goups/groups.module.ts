import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './schemas/group.schema';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { DivisionCreatedListener } from './listeners/division-created.listener';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Division, DivisionSchema } from '../divisions/schemas/division.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Group.name, schema: GroupSchema },
            { name: Division.name, schema: DivisionSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    controllers: [GroupsController],
    providers: [GroupsService, DivisionCreatedListener],
})
export class GroupsModule {}
