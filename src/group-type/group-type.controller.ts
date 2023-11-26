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
import {GroupType} from "./schemas/group-type.schema";
import {GroupTypeService} from "./group-type.service";
import {CreateGroupTypeDto} from "./dto/create-group-type.dto";
import {UpdateGroupTypeDto} from "./dto/update-group-type.dto";

//@ApiBearerAuth()
@ApiTags('group-type')
@Controller('group-type')
export class GroupTypeController {
  constructor(private readonly GroupTypeService: GroupTypeService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Group Type' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'New Group Type created',
    type: GroupType,
  })
  create(@Body() createGroupTypeDto: CreateGroupTypeDto) {
    return this.GroupTypeService.create(createGroupTypeDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all Group Types' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'List of all Group Types',
    type: [GroupType],
  })
  findAll() {
    return this.GroupTypeService.findAll();
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Group Type by ID' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: GroupType,
  })
  findOne(@Param('id') id: string) {
    return this.GroupTypeService.findOne(id);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Group Type by ID' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'Updated',
    type: GroupType,
  })
  update(@Param('id') id: string, @Body() updateGroupTypeDto: UpdateGroupTypeDto) {
    return this.GroupTypeService.update(id, updateGroupTypeDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Group Type by ID' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'Deleted',
  })
  remove(@Param('id') id: string) {
    return this.GroupTypeService.remove(id);
  }
}