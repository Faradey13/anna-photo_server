import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";





@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'asdasdF34fsF',
    });
  }

  async validate(payload: any) {
    console.log('Validating payload:', payload);
    if (!payload) {
      console.log('Invalid token');
      throw new UnauthorizedException('Invalid token');
    }
    return { userId: payload.id, email: payload.email };
  }}