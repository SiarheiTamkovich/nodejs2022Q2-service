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
    },
  ];

  create(createUserDto: CreateUserDto) {
    if (createUserDto.login === '' || createUserDto.password === '') {
      throw new HttpException(
        'Bad request. body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    const id = uuidv4();
    const user = new User(id, createUserDto.login, createUserDto.password);
    this.usersArr.push(user);
    return user;
  }

  findAll() {
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

  update(id: number, updatePasswordDto: UpdatePasswordDto) {
    // const index = this._usersArr.map((user) => user.id === id);
    // return new User(id, userId, updateUserDto.login, updateUserDto.password);
  }

  remove(id: string) {
    this.usersArr = this.usersArr.filter((user) => user.id !== id);
    console.log(this.usersArr);
  }
}
