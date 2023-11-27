import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DivisionsService } from './divisions.service';
import { CreateDivisionDto } from './dto/create-division.dto';
import { UpdateDivisionDto } from './dto/update-division.dto';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Division} from "./schemas/division.schema";

@ApiTags(`divisions`)
@Controller('divisions')
export class DivisionsController {
  constructor(private readonly divisionsService: DivisionsService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Division' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'New Division created',
    type: Division,
  })
  create(@Body() createDivisionDto: CreateDivisionDto) {
    return this.divisionsService.create(createDivisionDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all Division' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'List of all Division',
    type: [Division],
  })
  findAll() {
    return this.divisionsService.findAll();
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Division by ID' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Division,
  })
  findOne(@Param('id') id: string) {
    return this.divisionsService.findOne(id);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Division by ID' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'Updated',
    type: Division,
  })
  update(@Param('id') id: string, @Body() updateDivisionDto: UpdateDivisionDto) {
    return this.divisionsService.update(id, updateDivisionDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Division by ID' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'Deleted',
  })
  remove(@Param('id') id: string) {
    return this.divisionsService.remove(id);
  }
}
