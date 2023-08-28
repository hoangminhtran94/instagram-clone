import ChangeProfileImage from "@/components/AccountsComponents/EditProfile/ChangeProfileImage";
import EditProfileForm from "@/components/AccountsComponents/EditProfile/EditProfileForm";
const ProfileEdit = () => {
  return (
    <div className="">
      <div className="text-xl">Edit profile</div>
      <div className="w-[500px]">
        <ChangeProfileImage />
        <EditProfileForm />
      </div>
    </div>
  );
};

export default ProfileEdit;
