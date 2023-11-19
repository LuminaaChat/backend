import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import {User} from "../../user/schemas/user.schema";

export type GroupChatDocument = HydratedDocument<GroupChat>;

@Schema({ timestamps: true })
export class GroupChat {
    @ApiProperty({
        example: '1aa21eb9-42d5-467a-9988-5696bc4bbda6',
        description: 'ID of the GroupChat',
    })
    _id: string;

    @ApiProperty({
        example: 23,
        description: 'Version of the GroupChat',
    })
    __v: number;

    @ApiProperty({
        example: 'Cat Channel',
        description: 'Name of the GroupChat',
    })
    @Prop()
    name: string;

    @ApiProperty({
        example: 'cat-lovers',
        description: 'Tag of the GroupChat',
    })
    @Prop()
    tag: string;

    @ApiProperty({
        example: 'This is a awesome channel for all cat lovers',
        description: 'Description of the GroupChat',
    })
    @Prop()
    description: string;

    @ApiProperty({
        description: 'Owners of the GroupChat',
    })
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    owners: User[];

    @ApiProperty({
        description: 'Members of the GroupChat',
    })
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    members: User[];

    @ApiProperty({
        description: 'Roles of the GroupChat',
    })
    @Prop()
    roles: string[];

    @ApiProperty({
        description: 'Messages of the GroupChat',
    })
    @Prop()
    messages: string[];

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'Created At of the GroupChat',
    })
    createdAt: Date;

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'Updated At of the GroupChat',
    })
    updatedAt: Date;
}

export const GroupChatSchema = SchemaFactory.createForClass(GroupChat);