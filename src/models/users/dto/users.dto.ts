export class UserDTO {
  id: string;
  nickname: string;
  email: string;
  profileUrl: string;

  constructor(user: {
    id: string;
    nickname: string;
    email: string;
    profileUrl: string;
  }) {
    this.id = user.id ?? undefined;
    this.nickname = user.nickname ?? undefined;
    this.email = user.email ?? undefined;
    this.profileUrl = user.profileUrl ?? undefined;
  }
}
