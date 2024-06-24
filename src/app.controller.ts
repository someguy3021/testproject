import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Request,
  UsePipes
} from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { CreateUserDto, CreateUserSchema } from './users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JoiValidationPipe } from './pipes/ValidationPipe';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('auth/register')
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
