import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'class-sanitizer';
import {
    IsArray,
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';

export class RegisterDto {
    @ApiProperty({
        example: 'john@luminaa.chat',
        description: 'Email Address of the User',
    })
    @Trim()
    @IsEmail()
    public readonly email: string;

    @ApiProperty({ example: 'demo', description: 'Passwort of the User' })
    @IsString()
    @MinLength(8)
    public readonly password: string;

    @ApiProperty({
        example: 'John',
        description: 'Firstname of the User',
        required: true,
    })
    @IsString()
    public readonly firstName?: string;

    @ApiProperty({
        example: 'Doe',
        description: 'Lastname of the User',
        required: true,
    })
    @IsString()
    public readonly lastName?: string;

    @ApiProperty({
        example: ['operator', 'employee'],
        description: 'Roles of the User',
        required: true,
    })
    @IsArray()
    @IsNotEmpty()
    public readonly roles?: string[];
}
