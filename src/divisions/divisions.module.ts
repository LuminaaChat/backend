import { Module } from '@nestjs/common';
import { DivisionsService } from './divisions.service';
import { DivisionsController } from './divisions.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Division, DivisionSchema} from "./schemas/division.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Division.name, schema: DivisionSchema }]),
  ],
  controllers: [DivisionsController],
  providers: [DivisionsService],
})
export class DivisionsModule {}
