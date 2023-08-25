import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@UseGuards(AuthGuard('jwt')) // 認証が必要なので、全てのエンドポイントに対して認証を行う。JwtStrategyでカスタマイズする
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
