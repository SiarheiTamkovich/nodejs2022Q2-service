import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignInUserDto } from './dto/sign-in-user.dto';
import jwt = require('jsonwebtoken');
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  //
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async login(body: SignInUserDto): Promise<{ token: string }> {
    //
    const user = await this.usersRepository.findOne({
      select: ['id', 'password'],
      where: { login: body.login },
    });

    if (!user) {
      throw new HttpException('User was not founded!', HttpStatus.FORBIDDEN);
    }

    // eslint-disable-next-line prettier/prettier
    const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException('User password wrong!', HttpStatus.FORBIDDEN);
    }

    const token = jwt.sign(
      { userId: user.id, login: body.login },
      process.env.JWT_SECRET_KEY as string,
    );

    return { token };
  }
}
