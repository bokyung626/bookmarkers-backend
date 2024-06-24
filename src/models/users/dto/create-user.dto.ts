export class CreateUserDTO {
  nickname: string;
  email: string;
  password: string;
  profileImage: string;

  constructor(props: {
    nickname: string;
    email: string;
    password: string;
    profileImage: string;
  }) {
    this.nickname = props.nickname;
    this.email = props.email;
    this.password = props.password;
    this.profileImage = props.profileImage;
  }
}
