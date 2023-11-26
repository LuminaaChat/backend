import { Module } from '@nestjs/common';
import { GroupTypeService } from './group-type.service';
import { GroupTypeController } from './group-type.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { GroupType, GroupTypeSchema} from "./schemas/group-type.schema";
import {GroupTypeCreatedListener} from "./listeners/group-type-created.listener";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GroupType.name, schema: GroupTypeSchema }]),
  ],
  controllers: [GroupTypeController],
  providers: [GroupTypeService, GroupTypeCreatedListener],
})
export class GroupTypeModule {}
