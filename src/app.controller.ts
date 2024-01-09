import { Controller, Delete, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('dev')
@Controller('dev')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('hello')
    @ApiOperation({ summary: 'get Hello' })
    @ApiResponse({
        status: 200,
        description: 'Hello World',
        type: String,
    })
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('mock')
    @ApiOperation({ summary: 'Deploy Mock Data in Database' })
    @ApiResponse({
        status: 200,
        description: 'Mock data added!',
        type: String,
    })
    addMockData(): any {
        return this.appService.addMockData();
    }

    @Delete('mock')
    @ApiOperation({ summary: 'Delete Mock Data from Database' })
    @ApiResponse({
        status: 200,
        description: 'Mock data deleted!',
        type: String,
    })
    deleteMockData(): any {
        return this.appService.deleteMockData();
    }
}
