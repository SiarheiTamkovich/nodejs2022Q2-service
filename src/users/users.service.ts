import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  //
  private usersArr: User[] = [
    {
      id: '40af606c-c0bb-47d1-bc20-a2857242cde3',
      login: 'login',
      password: 'password',
      version: 1,
      createdAt: 0,
      updatedAt: 0,
    },
  ];

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.login === '' || createUserDto.password === '') {
      throw new HttpException(
        'Bad request. body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    const id = uuidv4();
    const user = new User(id, createUserDto.login, createUserDto.password);
    this.usersArr.push(user);
    const response = {
      id: user.id,
      login: user.login,
    };
    return response;
  }

  async findAll() {
    return this.usersArr;
  }

  async findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.usersArr.filter((user) => user.id === id)[0];
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    if (
      updatePasswordDto.oldPassword === '' ||
      updatePasswordDto.newPassword === ''
    ) {
      throw new HttpException(
        'Bad request. body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.usersArr.filter((user) => user.id === id)[0];
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.password != updatePasswordDto.oldPassword) {
      throw new HttpException('oldPassowrd is wrong', HttpStatus.FORBIDDEN);
    }
    user.password = updatePasswordDto.newPassword;
    ++user.version;
    user.updatedAt = Number(new Date());
    const response = {
      id: user.id,
      login: user.login,
      version: user.version,
    };
    return response;
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.usersArr.filter((user) => user.id === id)[0];
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    this.usersArr = this.usersArr.filter((user) => user.id !== id);
  }
}
