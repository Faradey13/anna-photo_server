import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { newUserDto, userDto } from "../user/user.dto";
import * as bcrypt from "bcryptjs";
import { User } from "../user/user.model";
import { JwtService } from "@nestjs/jwt";




@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,

  ) {
  }

  async newUser(user: newUserDto) {
    if(user.secretKey !== process.env.SECRET_KEY){
      throw new UnauthorizedException({ message: 'Неверный секретный ключ' });
    } else {
      const NewUser = await this.userService.createUser({ email:user.email,password:user.password });
      return this.generateToken(NewUser)
    }
  }

  async login(dto: userDto) {
    const user = await this.validateUser(dto)
    const token = await  this.generateToken(user)
    return token
  }


  private async validateUser(dto: userDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Некорректный емайл или пароль' })
  }
  private async generateToken(user: User) {
    const payload = {email: user.email, id: user.id}
    return {
      token: this.jwtService.sign(payload)
    }
  }

  async validateToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}