"use client";
import { useState } from "react";
import ManageAccessTabs from "./ManageAccessTabs";
const ManageAccessPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  let content1 = "";
  let content2 = "";
  switch (currentTab) {
    case 1:
      content1 = `These are apps and websites you've connected to your Instagram account that you may not have used in the last 90 days. They're no longer able to access your non-public information, but may still have the information you shared while they were active. "Non-public" means information that an app can only access if you choose to share it when you log in with your Instagram account (like your email address).`;
      content2 =
        "You have no expired applications that had access to your Instagram account.";
      break;
    case 2:
      content1 = `These are apps and websites that are no longer connected to your Instagram account. They can't access your non-public information anymore, but may still have the information you shared while they were active. "Non-public" means information that an app can only access if you choose to share it when you log in with your Instagram account (like your email address). You can ask an app to delete your information. To do it, review their Privacy Policy for details and contact information. If you contact an app, they may need your User ID.`;
      content2 =
        "You have no removed applications that had access to your Instagram account.";
      break;
    default:
      content1 =
        "These are apps and websites you've connected to your Instagram account. They can access non-public information that you choose to share with them.";
      content2 =
        "You have not authorized any applications to access your Instagram account.";
      break;
  }
  return (
    <div className="mt-8 flex flex-col gap-5">
      <ManageAccessTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="flex flex-col gap-3">
        <div className="text-xs">{content1}</div>
        <div className="text-xxs">{content2}</div>
      </div>
    </div>
  );
};
export default ManageAccessPage;
