export class CreateUserDTO {
  nickname: string;
  email: string;
  password: string;
  profileUrl: string;

  constructor(user: {
    nickname: string;
    email: string;
    password: string;
    profileUrl: string;
  }) {
    this.nickname = user.nickname;
    this.email = user.email;
    this.password = user.password;
    this.profileUrl = user.profileUrl ?? "";
  }
}
