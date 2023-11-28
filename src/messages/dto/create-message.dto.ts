import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    example: 'Hello World!',
    description: 'Message of the Message',
  })
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Sender of the Message',
  })
  @IsNotEmpty()
  sender: string;

  @ApiProperty({
    description: 'Receiver of the Message',
  })
  @IsNotEmpty()
  receiver: string;

  @ApiProperty({
    example: 'NORMAL',
    description: 'Type of the Message',
  })
  @IsNotEmpty()
  type: string;
}
