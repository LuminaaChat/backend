import { Module } from '@nestjs/common';
import { GroupTypeService } from './group-type.service';
import { GroupTypeController } from './group-type.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { GroupType, GroupTypeSchema} from "./schemas/group-type.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GroupType.name, schema: GroupTypeSchema }]),
  ],
  controllers: [GroupTypeController],
  providers: [GroupTypeService],
})
export class GroupTypeModule {}
