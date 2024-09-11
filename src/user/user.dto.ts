export class userDto {
  email: string;
  password: string;
}

export class newUserDto extends userDto {
  secretKey: string
}