export class UserDTO {
  id: string;
  nickname: string;
  email: string;
  profileImage: string | null;

  constructor(user: {
    id: string;
    nickname: string;
    email: string;
    profileImage: string | null;
  }) {
    this.id = user.id ?? undefined;
    this.nickname = user.nickname ?? undefined;
    this.email = user.email ?? undefined;
    this.profileImage = user.profileImage ?? null;
  }
}
