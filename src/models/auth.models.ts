export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
}
