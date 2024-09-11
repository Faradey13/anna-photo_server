import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../user/user.model";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";



@Module({
  imports: [
    PassportModule,
    forwardRef(() => UserModule),
    SequelizeModule.forFeature([User]),
    JwtModule.register({secret: 'asdasdF34fsF',
      signOptions: {
        expiresIn: '24h'
      } }),
  ],
  providers: [AuthService, UserService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
