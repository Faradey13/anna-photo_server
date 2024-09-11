import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import * as bcrypt from "bcryptjs";
import { userDto } from "./user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User
  ) {
  }

  async createUser(dto: userDto) {
    const hashPassword = await bcrypt.hash(dto.password, 5);
    return await this.userModel.create({
      password: hashPassword,
      email: dto.email,
    });
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({where:{
      email: email
      }})
  }
}
