import { PostImage, Tag } from "@prisma/client";
import { UserSummary } from "./user.models";
export interface PostLike {
  owner: {
    id: string;
    username: string;
    fullName: string;
    currentProfileImage: string;
    posts: {
      images: {
        src: string;
      }[];
    }[];
    _count: {
      posts: number;
      followers: number;
      following: number;
    };
  };
}

export interface PostComment {
  id: string;
  createdAt: Date;
  owner: UserSummary;
  message: string;
  _count: {
    likes: number;
    replies: number;
  };
}
export interface PostDetail {
  id: string;
  yourPost: boolean;
  caption: string;
  createdAt: Date;
  owner: {
    id: string;
    username: string;
    currentProfileImage: string;
  };
  likes: PostLike[];
  images: PostImage[];
  tags: Tag[];
  _count: {
    likes: number;
  };
}
