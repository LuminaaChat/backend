import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsBoolean, IsNotEmpty, IsString} from "class-validator";

export class CreateDivisionDto {
    @ApiProperty({
        example: '#Allgemein',
        description: 'Name of the Channel',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        example: 'Ein Channel für alle',
        description: 'Description of the Channel',
    })
    @IsString()
    description: string;

    @ApiProperty({
        example: '#123456',
        description: 'HEX Color of the Channel',
    })
    @IsString()
    color: string;

    @ApiProperty({
        example: 'pulse',
        description: 'Icon of the Channel',
    })
    @IsString()
    icon: string;

    @ApiProperty({
        description: 'Groups of the Division',
    })
    @IsArray()
    @IsString()
    groups: string[];

    @ApiProperty({
        example: 'EMPLOYEE',
        description: 'Min Role of User for this Channel',
    })
    @IsString()
    minRole: string;

    @ApiProperty({
        example: true,
        description: 'Is this channel currently visible?',
    })
    @IsBoolean()
    visible: boolean;
}
