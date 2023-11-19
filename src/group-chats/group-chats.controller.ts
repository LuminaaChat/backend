import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {GroupChatsService} from "./group-chats.service";
import {GroupChat} from "./schemas/group-chat.schema";
import {CreateGroupChatDto} from "./dto/create-group-chat.dto";
import {UpdateGroupChatDto} from "./dto/update-group-chat.dto";

//@ApiBearerAuth()
@ApiTags(`groupchats`)
@Controller('groupchats')
export class GroupChatsController {
  constructor(private readonly GroupChatsService: GroupChatsService) {}

  @Post('groups/{groupID}/groupchats')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create GroupChat' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'New GroupChat created',
    type: GroupChat,
  })
  create(@Body() createGroupChatDto: CreateGroupChatDto) {
    return this.GroupChatsService.create(createGroupChatDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all GroupChats' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'List of all GroupChats',
    type: [GroupChat],
  })
  findAll() {
    return this.GroupChatsService.findAll();
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get GroupChat by ID' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: GroupChat,
  })
  findOne(@Param('id') id: string) {
    return this.GroupChatsService.findOne(id);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update GroupChat by ID' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'Updated',
    type: GroupChat,
  })
  update(@Param('id') id: string, @Body() updateGroupChatDto: UpdateGroupChatDto) {
    return this.GroupChatsService.update(id, updateGroupChatDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete GroupChat by ID' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'Deleted',
  })
  remove(@Param('id') id: string) {
    return this.GroupChatsService.remove(id);
  }
}