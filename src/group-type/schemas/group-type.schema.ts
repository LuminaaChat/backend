import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiOAuth2, ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';

export type GroupTypeDocument = HydratedDocument<GroupType>;

@Schema({ timestamps: true })
export class GroupType {
    @ApiProperty({
        example: '1aa21eb9-42d5-467a-9988-5696bc4bbda6',
        description: 'ID of the GroupType',
    })
    _id: string;

    @ApiProperty({
        example: 23,
        description: 'Version of the GroupType',
    })
    __v: number;

    @ApiProperty({
        description: 'Name of the GroupType',
    })
    @Prop()
    name: string;

    @ApiProperty({
        description: 'Description of the GroupType',
    })
    @Prop()
    description: string;

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'Created At of the GroupType',
    })
    createdAt: Date;

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'Updated At of the GroupType',
    })
    updatedAt: Date;

    @ApiProperty({
        description: 'Colorcode to be used in displaying the GroupType in collapsed views',
    })
    @Prop()
    color: string;

    @ApiProperty({
        description: 'Icon to be used in displaying the GroupType in collapsed views',
    })
    @Prop()
    Icon: string;

    @ApiProperty({
        description: 'GroupType is currently enabled',
    })
    @Prop()
    Enabled: boolean;
}

export const GroupTypeSchema = SchemaFactory.createForClass(GroupType);