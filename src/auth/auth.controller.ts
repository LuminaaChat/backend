import { Body, Controller, Inject, Post, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/schemas/user.schema';
import { CurrentUser } from '../core/decorators/current-user.decorator';
import { PinRegisterDto } from './dto/pin-register.dto';
import { PinVerifyDto } from './dto/pin-verify.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    @Inject(AuthService)
    private readonly authService: AuthService;

    @Post('register')
    @ApiOperation({ summary: 'Register a user' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'New User created',
        type: RegisterDto,
    })
    register(@Body() body: RegisterDto): Promise<User | never> {
        return this.authService.register(body);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login a user' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'User was logedin',
        type: LoginDto,
    })
    login(@Body() body: LoginDto): Promise<{ token: string; user: User }> {
        return this.authService.login(body);
    }

    @Post('pin/verify')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Check Pin of user' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'User PIN is right',
        type: LoginDto,
    })
    pinVerify(@Body() body: PinVerifyDto): Promise<boolean | never> {
        return this.authService.pinVerify(body);
    }

    @Post('pin/register')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Register Pin for user' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'PIN is registered',
        type: LoginDto,
    })
    pinRegister(@Body() body: PinRegisterDto): Promise<boolean | never> {
        return this.authService.pinRegister(body);
    }

    @Get('refresh')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Refresh a user token' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'User token was refreshed',
    })
    refresh(@CurrentUser() user: User): Promise<{ token: string; user: User }> {
        return this.authService.refresh(user);
    }
}
