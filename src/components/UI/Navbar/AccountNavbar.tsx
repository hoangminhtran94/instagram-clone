import AccountNavLink from "./AccountNavbarComponents/AccountNavLink";
const AccountNavbar = () => {
  return (
    <div className=" mt-5 w-[300px] px-3 border-r flex flex-col">
      <div className="flex flex-col px-2">
        <div className=" text-lg font-bold p-4 ">Settings</div>
        <AccountNavLink href="edit">Edit Profile</AccountNavLink>
        <AccountNavLink href="manage_access">Apps and websites</AccountNavLink>
        <AccountNavLink href="settings">Email notifications</AccountNavLink>
        <AccountNavLink href="what_you_see">What you see</AccountNavLink>
        <AccountNavLink href="who_can_see_your_content">
          Who can see your content
        </AccountNavLink>
        <AccountNavLink href="how_others_can_interact_with_you">
          How others can interact with you
        </AccountNavLink>
        <div className="px-4 py-3 text-sm bg-gray-100 rounded-lg">
          Supervision
        </div>
        <div className="px-4 py-3 text-sm bg-gray-100 rounded-lg">Help</div>
      </div>
    </div>
  );
};

export default AccountNavbar;
