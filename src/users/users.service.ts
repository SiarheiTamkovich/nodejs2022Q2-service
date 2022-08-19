import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { validate as uuidValidate } from 'uuid';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashData } from 'src/shared/utils/hashData';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  //
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    //
    const { password } = createUserDto;
    const hashPassword = await hashData(password);
    const user = {
      login: createUserDto.login,
      password: hashPassword,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const newUser = this.userRepository.create(user);
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

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    //
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

    const isOldPasswordCorrect = await bcrypt.compare(
      updatePasswordDto.oldPassword,
      user.password,
    );
    if (!isOldPasswordCorrect) {
      throw new HttpException('Old Password is wrong!', HttpStatus.FORBIDDEN);
    }

    const hashPassword = await hashData(updatePasswordDto.newPassword);
    user.password = hashPassword;
    ++user.version;
    user.updatedAt = Date.now();
    user.save();
    return user;
  }

  async remove(id: string): Promise<void> {
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
