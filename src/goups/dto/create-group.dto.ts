import { ApiProperty } from '@nestjs/swagger';
import {IsArray, IsBoolean, IsNotEmpty, IsString} from 'class-validator';

export class CreateGroupDto {
    @ApiProperty({
        example: 'Stationär',
        description: 'Name of the Group',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        example: 'Ein Channel für alle',
        description: 'Description of the Group',
    })
    @IsString()
    description: string;

    @ApiProperty({
        example: '#123456',
        description: 'HEX Color of the Group',
    })
    @IsString()
    color: string;

    @ApiProperty({
        example: 'pulse',
        description: 'Icon of the Group',
    })
    @IsString()
    icon: string;

    @ApiProperty({
        description: 'Channels of the Group',
    })
    @IsArray()
    @IsString()
    channels: string[];

    @ApiProperty({
        example: 'EMPLOYEE',
        description: 'Min Role of User for this Group',
    })
    @IsString()
    minRole: string;

    @ApiProperty({
        example: true,
        description: 'Is this Group currently visible?',
    })
    @IsBoolean()
    visible: boolean;
}