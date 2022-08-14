import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IUserResponseAdd, User } from 'src/users/entities/user.entity';
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

  @Post('/signup')
  @ApiOperation({ summary: 'Sign up to create an account' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User created',
    schema: signUp,
  })
  async signup(@Body() signUpDto: CreateUserDto) {
    const newUser = await this.usersService.create(signUpDto);
    const responseUser: IUserResponseAdd = {
      id: (newUser as User).id,
      login: (newUser as User).login,
    };
    return responseUser;
  }
}
