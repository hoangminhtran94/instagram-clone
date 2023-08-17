import { FC } from "react";
import PostActions from "./PostActions";
import PostComment from "./PostComments";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";
import PostImages from "./PostImages";
import PostLikes from "./PostLikes";
import { Post, PostImage, User, Like, Comment } from "@prisma/client";

export type PostProps = Post & {
  owner: User;
  images: PostImage[];
  likes?: Like[];
  comments?: Comment[];
};
const Post: FC<{ post: PostProps }> = ({ post }) => {
  return (
    <div className="w-full border-b border-b-slate-300 ">
      <PostHeader creator={post.owner} createdDate={post.createdAt} />
      <PostImages images={post.images} />
      <PostActions />
      {post.likes && <PostLikes postId={post.id} likes={post.likes} />}
      <PostContent creator={post.owner} caption={post.caption} />
      {post.comments && (
        <PostComment postId={post.id} comments={post.comments} />
      )}
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
