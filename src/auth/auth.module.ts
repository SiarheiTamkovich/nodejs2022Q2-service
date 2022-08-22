import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccessJwtStrategy } from './strategy/at.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, AccessJwtStrategy],
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      //secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
