import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ArchService } from './arch.service';
import { CreateArchDto } from './dto/create-arch.dto';
import { UpdateArchDto } from './dto/update-arch.dto';

@Controller('arch')
export class ArchController {
    constructor(private readonly archService: ArchService) {}

    @Post()
    create(@Body() createArchDto: CreateArchDto) {
        return this.archService.create(createArchDto);
    }

    @Get()
    findAll() {
        return this.archService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.archService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateArchDto: UpdateArchDto) {
        return this.archService.update(+id, updateArchDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.archService.remove(+id);
    }
}
