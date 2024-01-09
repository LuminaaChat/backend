import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

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
