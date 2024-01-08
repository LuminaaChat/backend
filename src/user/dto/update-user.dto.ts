import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsBoolean,
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        example: '1aa21eb9-42d5-467a-9988-5696bc4bbda6',
        description: 'ID of the User',
    })
    @IsNotEmpty()
    @IsString()
    _id: string;

    @ApiProperty({
        example: 'johndoe@luminaa.chat',
        description: 'Username of the User',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '123456789',
        description: 'Password of the User',
    })
    @IsString()
    password: string;

    @ApiProperty({
        example: '1234',
        description: 'PIN of the User',
    })
    @IsString()
    pin: string;

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'Expire Date',
    })
    @IsDate()
    expire: Date | null;

    @ApiProperty({
        example: true,
        description: 'Is Active Status',
    })
    @IsBoolean()
    active: boolean;

    @ApiProperty({
        example: ['operator', 'employee'],
        description: 'Role of the User',
    })
    @IsArray()
    roles: string[];

    @ApiProperty({
        example: true,
        description: 'Is Email Verified',
    })
    @IsBoolean()
    emailVerified: boolean;
}
