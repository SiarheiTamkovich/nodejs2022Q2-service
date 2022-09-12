import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
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
    };

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser).catch((err) => {
      console.log(err);
      throw new HttpException(
        'User login already exists!',
        HttpStatus.CONFLICT,
      );
    });
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
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
    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    //
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.remove();
  }
}
