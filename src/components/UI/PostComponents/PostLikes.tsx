const PostLikes = () => {
  return (
    <div className="py-1">
      <div>
        Liked by{" "}
        <a className="font-bold" href="#">
          Minh Hoang Tran
        </a>{" "}
        and <span className="font-bold cursor-pointer">others</span>
      </div>
    </div>
  );
};

export default PostLikes;
