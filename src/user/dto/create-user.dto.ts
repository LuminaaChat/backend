import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString, IsEmail, IsBoolean, IsDate, IsArray} from 'class-validator';
import {Prop} from "@nestjs/mongoose";

export class CreateUserDto {
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
}
