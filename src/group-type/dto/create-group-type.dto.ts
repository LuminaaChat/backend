import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGroupTypeDto {
    @ApiProperty({
        example: 'Ambulant',
        description: 'Name of the GroupType',
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'Dies ist der Ambulanten Bereich',
        description: 'Description of the GroupType',
    })
    description: string;
}