import {Module} from '@nestjs/common';
import {DivisionsService} from './divisions.service';
import {DivisionsController} from './divisions.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Division, DivisionSchema} from "./schemas/division.schema";
import {User, UserSchema} from "../user/schemas/user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Division.name, schema: DivisionSchema },
            { name: User.name, schema: UserSchema }
        ]),
    ],
    controllers: [DivisionsController],
    providers: [DivisionsService],
})
export class DivisionsModule {
}
