import { PostImage, Saved, Tag } from "@prisma/client";
import { ExplorePost } from "./post.models";

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

export interface UserProfile {
  username: string;
  fullName: string;
  currentProfileImage: string;
  posts: ExplorePost[];
  saved?: Saved[];
  taggedPosts?: Tag[];
  youAreFollower: boolean;
  yourProfile: boolean;
  _count: { posts: number; followers: number; following: number };
}

export interface UserSearchResult {
  id: string;
  username: string;
  fullName: string;
  currentProfileImage: string;
}
