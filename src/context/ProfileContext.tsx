"use client";
import { User } from "@prisma/client";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { UserData } from "@/app/(withsidebar)/[profileId]/layout";

interface ProfileContextProps {
  userData: UserData | null;
  setUserData: Dispatch<SetStateAction<UserData | null>>;
}

const ProfileContext = createContext<ProfileContextProps>({
  userData: null,
  setUserData: () => {},
});

const ProfileContextProvider: FC<{
  children: ReactNode;
  user: UserData | null;
}> = ({ children, user }) => {
  const [userData, setUserData] = useState<UserData | null>(user);

  return (
    <ProfileContext.Provider value={{ userData, setUserData }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;

export const useProfileContext = () => useContext(ProfileContext);
