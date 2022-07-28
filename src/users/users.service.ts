import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  //
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    //
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser).catch(() => {
      throw new HttpException(
        'User login already exists!',
        HttpStatus.CONFLICT,
      );
    });
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: UUIDType) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    // const user = this.usersArr.filter((user) => user.id === id)[0];
    // if (!user) {
    //   throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    // }
    // return user;
    return this.userRepository.findOneBy({ id });
  }

  // async update(id: string, updatePasswordDto: UpdatePasswordDto) {
  //   if (
  //     updatePasswordDto.oldPassword === '' ||
  //     updatePasswordDto.newPassword === ''
  //   ) {
  //     throw new HttpException(
  //       'Bad request. body does not contain required fields',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   if (!uuidValidate(id)) {
  //     throw new HttpException(
  //       'Bad request. userId is invalid (not uuid)',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   const user = this.usersArr.filter((user) => user.id === id)[0];
  //   if (!user) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }
  //   if (user.password != updatePasswordDto.oldPassword) {
  //     throw new HttpException('oldPassowrd is wrong', HttpStatus.FORBIDDEN);
  //   }
  //   user.password = updatePasswordDto.newPassword;
  //   ++user.version;
  //   user.updatedAt = Number(new Date());
  //   const response = {
  //     id: user.id,
  //     login: user.login,
  //     version: user.version,
  //   };
  //   return response;
  // }

  async remove(id: UUIDType): Promise<void> {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.remove();
  }
}
