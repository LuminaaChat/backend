import {ApiProperty} from "@nestjs/swagger";
import mongoose, {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Group} from "../../goups/schemas/group.schema";
import {User} from "../../user/schemas/user.schema";

export type DivisionDocument = HydratedDocument<Division>;

@Schema({ timestamps: true })
export class Division {
    @ApiProperty({
        example: '1aa21eb9-42d5-467a-9988-5696bc4bbda6',
        description: 'ID of the Division',
    })
    _id: string;

    @ApiProperty({
        example: 23,
        description: 'Version of the Division',
    })
    __v: number;

    @ApiProperty({
        example: 'Ambulant',
        description: 'Name of the Division',
    })
    @Prop({ unique: true })
    name: string;

    @ApiProperty({
        example: 'Ein Bereich für ambulante Mitarbeiter',
        description: 'Description of the Division',
    })
    @Prop({ default: null })
    description: string;

    @ApiProperty({
        example: '#FF5733',
        description: 'HEX Color of the Division',
    })
    @Prop({ default: null })
    color: string;

    @ApiProperty({
        example: 'car',
        description: 'Icon of the Division',
    })
    @Prop({ default: null })
    icon: string;

    @ApiProperty({
        description: 'Owners of the Division',
    })
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
    owners: User[];

    @ApiProperty({
        description: 'Members of the Division',
    })
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
    members: User[];

    @ApiProperty({
        description: 'Groups of the Division',
    })
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }])
    groups: Group[];

    @ApiProperty({
        example: 'USER',
        description: 'Min Role of User for this Division',
    })
    @Prop({ default: 'USER' })
    minRole: string;

    @ApiProperty({
        example: true,
        description: 'Is this Division currently visible?',
    })
    @Prop({ default: true })
    visible: boolean;

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'Created At of the Division',
    })
    @Prop()
    createdAt: Date;

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'Updated At of the Division',
    })
    @Prop()
    updatedAt: Date;

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'DeleteAt of the Division',
    })
    @Prop()
    deletedAt: Date;
}

export const DivisionSchema = SchemaFactory.createForClass(Division);
