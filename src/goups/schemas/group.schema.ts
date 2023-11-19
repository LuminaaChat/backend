import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import {User} from "../../user/schemas/user.schema";

export type GroupDocument = HydratedDocument<Group>;

@Schema({ timestamps: true })
export class Group {
    @ApiProperty({
        example: '1aa21eb9-42d5-467a-9988-5696bc4bbda6',
        description: 'ID of the Group',
    })
    _id: string;

    @ApiProperty({
        example: 23,
        description: 'Version of the Group',
    })
    __v: number;

    @ApiProperty({
        example: 'Cat Channel',
        description: 'Name of the Group',
    })
    @Prop()
    name: string;

    @ApiProperty({
        example: 'cat-lovers',
        description: 'Tag of the Group',
    })
    @Prop()
    tag: string;

    @ApiProperty({
        example: 'This is a awesome channel for all cat lovers',
        description: 'Description of the Group',
    })
    @Prop()
    description: string;

    @ApiProperty({
        description: 'Owners of the Group',
    })
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    owners: User[];

    @ApiProperty({
        description: 'Members of the Group',
    })
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    members: User[];

    @ApiProperty({
        description: 'Roles of the Group',
    })
    @Prop()
    roles: string[];

    @ApiProperty({
        description: 'Messages of the Group',
    })
    @Prop()
    messages: string[];

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'Created At of the Group',
    })
    createdAt: Date;

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'Updated At of the Group',
    })
    updatedAt: Date;
}

export const GroupSchema = SchemaFactory.createForClass(Group);