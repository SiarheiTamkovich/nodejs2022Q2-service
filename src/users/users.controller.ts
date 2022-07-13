import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users') // Section Swagger
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post() // POST http://localhost/users?userId={userId}
  create(
    @Query('userId') userId: number, // get userId from query
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }

  @Get() // GET http://localhost/users?userId={userId}
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id') // GET http://localhost/users/{Id}
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id') // PATCH http://localhost/users/{Id}
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id') // DELETE http://localhost/users/{Id}
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
