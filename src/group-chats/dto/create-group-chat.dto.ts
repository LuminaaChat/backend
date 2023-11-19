import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGroupChatDto {
    @ApiProperty({
        example: 'Cat GroupChat',
        description: 'Name of the GroupChat',
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'cat-lovers',
        description: 'Tag of the GroupChat',
    })
    @IsNotEmpty()
    tag: string;

    @ApiProperty({
        example: 'This is a awesome channel for all cat lovers',
        description: 'Description of the GroupChat',
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