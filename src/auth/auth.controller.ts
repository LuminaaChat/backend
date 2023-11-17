import {
    Body,
    Controller,
    Inject,
    Post,
    ClassSerializerInterceptor,
    UseInterceptors,
    UseGuards,
    Req,
    Get,
} from '@nestjs/common';
import { JwtAuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/schemas/user.schema';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    @Inject(AuthService)
    private readonly service: AuthService;

    @Post('register')
    @ApiOperation({ summary: 'Register a user' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'New User created',
        type: RegisterDto,
    })
    @UseInterceptors(ClassSerializerInterceptor)
    private register(@Body() body: RegisterDto): Promise<User | never> {
        return this.service.register(body);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login a user' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'User was logedin',
        type: LoginDto,
    })
    private login(
        @Body() body: LoginDto,
    ): Promise<{ token: string; user: User } | never> {
        return this.service.login(body);
    }

    @ApiBearerAuth()
    @Get('refresh')
    @ApiOperation({ summary: 'Refresh a user token' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'User token was refreshed',
    })
    @UseGuards(JwtAuthGuard)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private refresh(
        @Req() { user }: Request,
    ): Promise<{ token: string; user: User } | never> {
        return this.service.refresh(<User>user);
    }
}
