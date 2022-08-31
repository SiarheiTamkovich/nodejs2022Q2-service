import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { hashData } from 'src/shared/utils/hashData';

@Injectable()
export class AuthService {
  //
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      select: ['id', 'password'],
      where: { login: login },
    });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        throw new ForbiddenException();
      }
      delete user.password;
      return user;
    }
    return null;
  }

  async login(body: SignInUserDto) {
    //
    const user = await this.userRepository.findOne({
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

    const tokens = await this.getTokens(user.id, user.login);

    await this.setCurrentRefreshToken(tokens.refreshToken, user.id);

    return tokens;
  }

  async getTokens(id: string, login: string) {
    const accessToken = this.jwtService.signAsync(
      { login, sub: id },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      },
    );

    const refreshToken = this.jwtService.signAsync(
      { login, sub: id },
      {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      },
    );

    const [at, rt] = await Promise.all([accessToken, refreshToken]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await hashData(refreshToken);
    return this.userRepository.update(
      { id: userId },
      { refresh_token: currentHashedRefreshToken },
    );
  }

  async createAccessTokenFromRefreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.decode(refreshToken);
      if (!decoded) {
        throw new Error();
      }

      const user = await this.userRepository.findOneBy({ id: decoded.sub });

      if (!user) {
        throw new HttpException(
          'User with this id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      const isRefreshTokenMatching = await bcrypt.compare(
        refreshToken,
        user.refresh_token,
      );

      if (!isRefreshTokenMatching) {
        throw new UnauthorizedException('Invalid token');
      }

      const tokens = await this.getTokens(user.id, user.login);
      await this.setCurrentRefreshToken(tokens.refreshToken, user.id);
      return tokens;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async removeRefreshToken(token: string) {
    const decoded = await this.jwtService.decode(token);
    const user = await this.userRepository.findOneBy({ id: decoded.sub });
    if (!user) {
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.userRepository.update(
      { id: user.id },
      { refresh_token: null },
    );
  }
}
