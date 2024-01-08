import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateDivisionDto {
    @ApiProperty({
        example: 'Ambulant',
        description: 'Name of the Division',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        example: 'Ein Bereich für ambulante Mitarbeiter',
        description: 'Description of the Division',
    })
    @IsString()
    description: string;

    @ApiProperty({
        example: '#FF5733',
        description: 'HEX Color of the Division',
    })
    @IsString()
    color: string;

    @ApiProperty({
        example: 'car',
        description: 'Icon of the Division',
    })
    @IsString()
    icon: string;

    @ApiProperty({
        example: [],
        description: 'Owners of the Division',
    })
    @IsArray()
    @IsString()
    owners: string[];

    @ApiProperty({
        example: [],
        description: 'Members of the Division',
    })
    @IsArray()
    @IsString()
    members: string[];

    @ApiProperty({
        example: [],
        description: 'Groups of the Division',
    })
    @IsArray()
    @IsString()
    groups: string[];

    @ApiProperty({
        example: 'USER',
        description: 'Min Role of User for this Division',
    })
    @IsString()
    minRole: string;

    @ApiProperty({
        example: true,
        description: 'Is this Division currently visible?',
    })
    @IsBoolean()
    visible: boolean;
}
