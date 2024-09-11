import { Body, Controller, Post, Req, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "../user/user.model";
import { newUserDto, userDto } from "../user/user.dto";

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {
  }

  @Post("/login")
  async Login(@Body() dto: userDto) {
    return this.authService.login(dto);
  }

  @Post("/registration")
  async Registration(@Body() dto: newUserDto) {
    return this.authService.newUser(dto);
  }

  @Post("verify-token")
  async verifyToken(@Req() req: Request) {
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    if (!authHeader) {
      throw new UnauthorizedException("Authorization header not provided");
    }

    const token = authHeader.split(" ")[1];
    console.log(token)
    if (!token) {
      throw new UnauthorizedException("Token not provided");
    }

    const decodedToken = await this.authService.validateToken(token);
    return { message: "Token is valid", user: decodedToken };
  }
}