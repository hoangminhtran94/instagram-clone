import AccountNavLink from "./AccountNavbarComponents/AccountNavLink";
const AccountNavbar = () => {
  return (
    <div className=" mt-5 w-[250px] px-3 border-r flex flex-col">
      <div className="flex flex-col px-2">
        <div className=" text-lg font-bold p-4 ">Settings</div>
        <AccountNavLink href="/accounts/edit">Edit Profile</AccountNavLink>
        <AccountNavLink href="/accounts/manage_access">
          Apps and websites
        </AccountNavLink>
        <AccountNavLink href="/emails/settings">
          Email notifications
        </AccountNavLink>
        <AccountNavLink href="/accounts/what_you_see">
          What you see
        </AccountNavLink>
        <AccountNavLink href="/accounts/who_can_see_your_content">
          Who can see your content
        </AccountNavLink>
        <AccountNavLink href="/accounts/how_others_can_interact_with_you">
          How others can interact with you
        </AccountNavLink>
        <AccountNavLink href="/settings/help">
          How others can interact with you
        </AccountNavLink>
      </div>
    </div>
  );
};

export default AccountNavbar;
