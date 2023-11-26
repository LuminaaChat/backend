import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
    @ApiProperty({
        example: '1aa21eb9-42d5-467a-9988-5696bc4bbda6',
        description: 'ID of the Role',
    })
    _id: string;

    @ApiProperty({
        example: 23,
        description: 'Version of the Role',
    })
    __v: number;

    @ApiProperty({
        example: 'Employee',
        description: 'Name of the Role',
    })
    @Prop()
    name: string;

    @ApiProperty({
        example: 'EMPLOYEE',
        description: 'Unifier of the Role',
    })
    @Prop()
    unifier: string;

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'Created At of the Role',
    })
    @Prop()
    createdAt: Date;

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'Updated At of the Role',
    })
    @Prop()
    updatedAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
