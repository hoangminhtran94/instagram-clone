import ProfileNoContents from "./ProfileNoContents";

const ViewSaved = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex justify-between w-full">
        <p className="text-xs">{`Only you can see what you've saved`}</p>
        <button className="text-sm font-semibold text-blue-400 hover:text-slate-700">
          + New collection
        </button>
      </div>
      <ProfileNoContents
        src="/images/no-saved.png"
        alt="no-saved"
        header="Save"
        body="Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved."
      />
    </div>
  );
};

export default ViewSaved;
