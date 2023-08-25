import { PostImage, Tag } from "@prisma/client";

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

export interface UserData {
  yourProfile: boolean;
  saved: {
    id: string;
    ownerId: string;
    postId: string | null;
    reelPostId: string | null;
  }[];
  username: string;
  fullName: string;
  currentProfileImage: string;
  posts: {
    id: string;
    _count: {
      likes: number;
      comments: number;
    };
    images: PostImage[];
  }[];
  taggedPosts: Tag[];
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
}
