const PostLoading = () => {
  return (
    <div>
      <div className="flex justify-between items-center py-3 text-xs">
        <div className="flex items-center gap-2">
          <div className=" w-8 h-8 rounded-full bg-slate-200" />
          <div className="flex gap-2 items-center">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 w-[100px] h-[16px] bg-slate-200  rounded-full" />
              <div className="bg-slate-200 w-[80px] rounded-full h-[16px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-[400px] h-[400px] rounded-md bg-slate-200 "></div>
    </div>
  );
};

export default PostLoading;
