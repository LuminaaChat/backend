import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'class-sanitizer';
import { IsEmail, IsString } from 'class-validator';
import { User } from '../../user/schemas/user.schema';

export class PinVerifyDto {
    @ApiProperty({
        example: '1234',
        description: 'User PIN of the User',
    })
    @Trim()
    @IsEmail()
    public readonly pin: string;

    @ApiProperty({
        example: '12312-eqfrf2323-2323rdfdf',
        description: 'ID of the User',
    })
    @Trim()
    @IsString()
    public readonly userID: string;
}
