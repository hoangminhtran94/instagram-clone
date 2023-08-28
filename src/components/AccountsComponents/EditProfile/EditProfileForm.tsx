const EditProfileForm = () => {
  return (
    <form className="flex flex-col gap-4 mt-10">
      <div className="grid grid-cols-4  gap-7 text-sm">
        <label className="flex justify-end col-span-1">Website</label>
        <div className="flex flex-col col-span-3">
          <input className="input-form" placeholder="Website" disabled />
          <p className="text-xxs">
            Editing your links is only available on mobile. Visit the Instagram
            app and edit your profile to change the websites in your bio.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4  gap-7 text-sm">
        <label className="flex justify-end col-span-1">Bio</label>
        <div className="flex flex-col gap-2 col-span-3">
          <textarea
            maxLength={150}
            rows={3}
            className="input-form"
            placeholder="Bio"
          />
          <p className="text-xs">0/150</p>
        </div>
      </div>
      <div className="grid grid-cols-4  gap-7 text-sm">
        <label className="flex justify-end col-span-1">Gender</label>
        <div className="flex flex-col col-span-3">
          <button className="input-form text-start" placeholder="Website">
            Male
          </button>
          <p className="text-xxs">This won’t be part of your public profile.</p>
        </div>
      </div>
      <div className="grid grid-cols-4  gap-7 text-sm">
        <label className="flex justify-end col-span-1 text-end">
          Show account suggestions on profiles
        </label>
        <div className="flex items-center col-span-3 gap-2">
          <input type="checkbox" placeholder="Website" />

          <p className="text-xxs">
            Choose whether people can see similar account suggestions on your
            profile, and whether your account can be suggested on other
            profiles.[?]
          </p>
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
