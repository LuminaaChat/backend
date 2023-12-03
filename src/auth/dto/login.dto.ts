import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'class-sanitizer';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        example: 'johndoe@luminaa.chat',
        description: 'Email Address of the User',
    })
    @Trim()
    @IsEmail()
    public readonly email: string;

    @ApiProperty({ example: '123456789', description: 'Passwort of the User' })
    @IsString()
    public readonly password: string;
}
