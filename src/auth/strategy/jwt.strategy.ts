import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    super({
      // cookieからjwtを取得することを指定
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          let jwt = null;
          if (req && req.cookies) {
            jwt = req.cookies['access_token'];
          }
          return jwt;
        },
      ]),
      ignoreExpiration: false, // 有効期限をチェック
      secretOrKey: config.get<string>('JWT_SECRET'), // 秘密鍵
    });
  }

  async validate(payload: { sub: number; email: string }) {
    // payloadはAuthServiceで指定
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    delete user.hashedPassword;
    return user;
  }
}
