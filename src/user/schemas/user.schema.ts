import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @ApiProperty({
        example: '1aa21eb9-42d5-467a-9988-5696bc4bbda6',
        description: 'ID of the User',
    })
    _id: string;

    @ApiProperty({
        example: 23,
        description: 'Version of the User',
    })
    __v: number;

    @ApiProperty({
        example: 'info@luminaa.chat',
        description: 'Username of the User',
    })
    @Prop({ unique: true })
    email: string;

    @ApiProperty({
        example: 'John',
        description: 'Firstname of the User',
    })
    @Prop({ default: null })
    firstName: string;

    @ApiProperty({
        example: 'Doe',
        description: 'Lastname of the User',
    })
    @Prop({ default: null })
    lastName: string;

    @ApiProperty({
        description: 'Password of the User',
    })
    @Prop({ select: false })
    password: string;

    @ApiProperty({
        description: 'PIN of the User',
    })
    @Prop({ select: false, default: null })
    pin: string;

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'Last Login At',
    })
    @Prop({ default: null })
    lastLoginAt: Date;

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'Expire Date',
    })
    @Prop({ default: null })
    expire: Date | null;

    @ApiProperty({
        example: true,
        description: 'Is Active Status',
    })
    @Prop({ default: false })
    active: boolean;

    @ApiProperty({
        example: ['operator', 'employee'],
        description: 'Role of the User',
    })
    @Prop({ default: null })
    roles: string[];

    @ApiProperty({
        example: true,
        description: 'Is Email Verified',
    })
    @Prop({ default: false })
    emailVerified: boolean;

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'Created At of the Store',
    })
    createdAt: Date;

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'Updated At of the Store',
    })
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
