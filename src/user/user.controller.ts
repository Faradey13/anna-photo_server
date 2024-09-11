import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.model";
import { userDto } from "./user.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('user')
export class UserController {

  constructor(private usersService: UserService) {}



  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: userDto): Promise<User> {
    return this.usersService.createUser(dto)
  }
}
