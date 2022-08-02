import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashData } from 'src/shared/utils/hashData';

@Injectable()
export class UsersService {
  //
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    //
    const { login, password } = createUserDto;

    const hashPassword = await hashData(password);
    console.log(hashPassword);
    // eslint-disable-next-line prettier/prettier
    const newUser = this.userRepository.create({login, password: hashPassword});
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
    return this.userRepository.findOneBy({ id });
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
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException('Old Password is wrong', HttpStatus.FORBIDDEN);
    }
    user.password = updatePasswordDto.newPassword;
    ++user.version;
    user.updatedAt = new Date();
    user.save();
    return user;
  }

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
