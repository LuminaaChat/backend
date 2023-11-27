import {ApiProperty} from "@nestjs/swagger";
import mongoose, {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Group} from "../../goups/schemas/group.schema";

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
        example: '#Allgemein',
        description: 'Name of the Division',
    })
    @Prop()
    name: string;

    @ApiProperty({
        example: 'Ein Channel für alle',
        description: 'Description of the Division',
    })
    @Prop()
    description: string;

    @ApiProperty({
        example: '#123456',
        description: 'HEX Color of the Division',
    })
    @Prop()
    color: string;

    @ApiProperty({
        example: 'pulse',
        description: 'Icon of the Division',
    })
    @Prop()
    icon: string;

    @ApiProperty({
        description: 'Groups of the Division',
    })
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }])
    groups: Group[];

    @ApiProperty({
        example: 'EMPLOYEE',
        description: 'Min Role of User for this Channel',
    })
    @Prop()
    minRole: string;

    @ApiProperty({
        example: true,
        description: 'Is this channel currently visible?',
    })
    @Prop()
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
