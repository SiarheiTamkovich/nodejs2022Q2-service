import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  //
  private _usersArr: User[] = [];

  create(createUserDto: CreateUserDto) {
    const id = this._getRandomInt();
    const user = new User(id, createUserDto.login, createUserDto.password);
    this._usersArr.push(user);
    return user;
  }

  findAll() {
    return this._usersArr;
  }

  findOne(id: number) {
    return this._usersArr.filter((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // const index = this._usersArr.map((user) => user.id === id);
    // return new User(id, userId, updateUserDto.login, updateUserDto.password);
  }

  remove(id: number) {
    this._usersArr = this._usersArr.filter((user) => user.id != id);
  }

  private _getRandomInt() {
    return Math.floor(Math.random() * 100);
  }
}
