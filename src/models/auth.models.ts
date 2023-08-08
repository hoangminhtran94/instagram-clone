export interface User {
  id: string;
  currentProfileImage: string;
  email: string;
  username: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
}
