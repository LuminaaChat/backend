import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
    @ApiProperty({
        example: 'Employee',
        description: 'Name of the Role',
    })
    @IsNotEmpty()
    name: string;
}
