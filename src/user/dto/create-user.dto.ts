import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsBoolean } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        example: 'johndoe@luminaa.chat',
        description: 'Username of the User',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'John Doe',
        description: 'E-Mail of the User',
    })
    @IsNotEmpty()
    @IsEmail()
    name: string;

    @ApiProperty({
        example: '123456789',
        description: 'Password of the User',
    })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({
        example: '2023-05-19T16:21:28.120Z',
        description: 'Last Login At',
    })
    @IsString()
    lastLoginAt: string;

    @ApiProperty({
        example: 'customer',
        description: 'Role of the User',
    })
    @IsNotEmpty()
    @IsString()
    role: string;

    @ApiProperty({
        example: true,
        description: 'Is Email Verified',
    })
    @IsNotEmpty()
    @IsBoolean()
    emailVerified: boolean;
}