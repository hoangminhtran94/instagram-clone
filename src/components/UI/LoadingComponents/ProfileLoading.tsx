const ProfileLoading = () => {
  return (
    <div className="p-10 pt-2 w-full">
      <div className="flex justify-between items-center text-xs w-full">
        <div className="flex items-center gap-20 w-full">
          <div className=" w-[150px] h-[150px] rounded-full bg-slate-200" />
          <div className="flex gap-2 items-center flex-1">
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex items-center gap-1 w-[80%] h-[16px] bg-slate-200  rounded-full" />
              <div className="bg-slate-200 w-[50%] rounded-full h-[16px]" />
              <div className="bg-slate-200 w-[40%] rounded-full h-[16px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoading;
