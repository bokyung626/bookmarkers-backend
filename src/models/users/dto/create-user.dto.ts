export class CreateUserDTO {
  nickname: string;
  email: string;
  password: string;
  profileImage: string;

  constructor(user: {
    nickname: string;
    email: string;
    password: string;
    profileImage: string;
  }) {
    this.nickname = user.nickname;
    this.email = user.email;
    this.password = user.password;
    this.profileImage = user.profileImage ?? "";
  }
}
