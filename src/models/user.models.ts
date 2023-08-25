export interface LoginUser {
  id: string;
  username: string;
  currentProfileImage: string;
  email: string;
  fullName: string;
}
export interface UserSummary {
  id: string;
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
  username: string;
  fullName: string;
  currentProfileImage: string;
  posts: {
    images: {
      src: string;
    }[];
  }[];
}
