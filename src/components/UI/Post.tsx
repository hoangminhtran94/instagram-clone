import { FC } from "react";
import PostAction from "./PostComponents/PostActions";
import PostComment from "./PostComponents/PostComments";
import PostContent from "./PostComponents/PostContent";
import PostHeader from "./PostComponents/PostHeader";
import PostImages from "./PostComponents/PostImages";
import PostLikes from "./PostComponents/PostLikes";
import { Post, PostImage, User } from "@prisma/client";

export type PostProps = Post & { owner: User; images: PostImage[] };
const Post: FC<{ post: PostProps }> = ({ post }) => {
  return (
    <div className="w-full pb-4 border-b border-b-slate-300 ">
      <PostHeader creator={post.owner} createdDate={post.createdAt} />
      <PostImages images={post.images} />
      <PostAction />
      <PostLikes />
      <PostContent />
      <PostComment />
    </div>
  );
};

export default Post;
//Avatar - name - time - Popup model setting
//ImageCarousel
//Action bar: Link,message,share,save
//Liked counts
//Description - shorten
//View all comments - open new modal
//Write commoents - Emo icon
