import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Request,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh.token.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { LocalAuthGuard } from './guards/local.auth.guard';
import signIn from './schema/sign-in.schema';
import signUp from './schema/sign-up.schema';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({ summary: 'Create token' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Token created',
    schema: signIn,
  })
  signIn(@Body() loginDto: SignInUserDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('/signup')
  @ApiOperation({ summary: 'Sign up to create an account' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User created',
    schema: signUp,
  })
  async signup(@Body() signUpDto: CreateUserDto) {
    const newUser = await this.usersService.create(signUpDto);
    const responseUser = {
      id: (newUser as User).id,
      login: (newUser as User).login,
    };
    return responseUser;
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh token' })
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.createAccessTokenFromRefreshToken(
      refreshTokenDto.refreshToken,
    );
  }
}
