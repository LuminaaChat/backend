import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'class-sanitizer';
import { IsEmail, IsString } from 'class-validator';
import {User} from "../../user/schemas/user.schema";

export class LoginDto {
    @ApiProperty({
        example: 'info@wud.chat',
        description: 'Email Address of the User',
    })
    @Trim()
    @IsEmail()
    public readonly email: string;

    @ApiProperty({ example: '123456789', description: 'Passwort of the User' })
    @IsString()
    public readonly password: string;

    @ApiProperty({ description: 'User Data', type: User })
    @IsString()
    public readonly user: string;
}