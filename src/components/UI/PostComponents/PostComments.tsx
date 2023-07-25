import Link from "next/link";

const PostComment = () => {
  return (
    <div className="flex flex-col gap-3 py-1">
      <Link href="#">View all 10 comments</Link>
      <textarea></textarea>
    </div>
  );
};

export default PostComment;
