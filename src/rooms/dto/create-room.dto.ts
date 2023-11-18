import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
    @ApiProperty({
        example: 'Cat Room',
        description: 'Name of the Room',
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'cat-lovers',
        description: 'Tag of the Room',
    })
    @IsNotEmpty()
    tag: string;

    @ApiProperty({
        example: 'This is a awesome channel for all cat lovers',
        description: 'Description of the Room',
    })
    description: string;

    @ApiProperty({
        description: 'Owners of the Room',
    })
    owners: string[];

    @ApiProperty({
        description: 'Members of the Room',
    })
    members: string[];

    @ApiProperty({
        description: 'Roles of the Room',
    })
    roles: string[];
}