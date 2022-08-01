import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/sign-in-user.dto';
import signIn from './schema/sign-in.schema';
import signUp from './schema/sign-up.schema';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Create token' })
  @ApiResponse({
    status: 201,
    schema: signIn,
  })
  @Post('/sign-in')
  signIn(@Body() signInDto: SignInUserDto) {
    return this.authService.signIn(signInDto);
  }

  @ApiOperation({ summary: 'Sign up to create an account' })
  @ApiResponse({
    status: 200,
    schema: signUp,
  })
  @Post('/sign-up')
  signup(@Body() signUpDto: CreateUserDto) {
    return this.usersService.create(signUpDto);
  }
}
