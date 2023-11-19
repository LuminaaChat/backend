import { PartialType } from '@nestjs/swagger';
import { CreateGroupChatDto } from './create-group-chat.dto';

export class UpdateGroupChatDto extends PartialType(CreateGroupChatDto) {}
