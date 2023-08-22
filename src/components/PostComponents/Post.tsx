import { FC, useEffect, useState } from "react";
import PostActions from "./PostActions";
import PostComment from "./PostComments";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";
import PostImages from "./PostImages";
import PostLikes from "./PostLikes";
import { PostDetail } from "@/models/post.models";
import { doc, onSnapshot } from "firebase/firestore";
import { fireStore } from "@/firebase.config";
import { PostRecord } from "@/repository/firebase";

export type PostProps = PostDetail;
const Post: FC<{ post: PostProps }> = ({ post }) => {
  const [likes, setLikes] = useState(post._count?.likes ?? 0);
  const [comments, setComments] = useState(post._count?.comments ?? 0);
  useEffect(() => {
    if (post) {
      const unsub = onSnapshot(doc(fireStore, "Posts", post.id), (doc) => {
        const data = doc.data() as unknown as PostRecord;
        setLikes(data.like_count);
        setComments(data.comment_count);
      });

      return () => {
        unsub();
      };
    }
  }, [post.id]);
  return (
    <div className="w-full border-b border-b-slate-300 ">
      <PostHeader
        creator={post.owner}
        createdDate={post.createdAt}
        postId={post.id}
      />
      <PostImages images={post.images} />
      <PostActions postId={post.id} youLikeThis={post.youLikeThis} />
      {post.likes && (
        <PostLikes likeCount={likes} postId={post.id} like={post.likes[0]} />
      )}
      <PostContent creator={post.owner} caption={post.caption} />
      <PostComment postId={post.id} commentCount={comments} />
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
