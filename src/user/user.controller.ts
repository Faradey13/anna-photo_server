import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.model";
import { userDto } from "./user.dto";

@Controller('user')
export class UserController {

  constructor(private usersService: UserService) {}



  @Post('/create')
  create(@Body() dto: userDto): Promise<User> {
    return this.usersService.createUser(dto)
  }
}
