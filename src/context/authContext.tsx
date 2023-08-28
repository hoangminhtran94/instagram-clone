"use client";

import { User } from "@/models/auth.models";
import { LoginUser } from "@/models/user.models";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface AuthContextState {
  user: LoginUser | null;
  login: (user: User, token: string) => void;
  setUser: Dispatch<SetStateAction<LoginUser | null>>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextState>({
  user: null,
  login: (user, token) => {},
  setUser: () => {},
  logout: () => {},
});

export const AuthContextProvider: FC<{
  children: ReactNode;
  user: LoginUser | null;
}> = ({ children, user }) => {
  const router = useRouter();
  const [authUser, setUser] = useState<LoginUser | null>(user);
  const login = (user: User, token: string) => {
    setUser(user);
    cookies.set("jwt_token", token, {
      secure: true,
      expires: 0.5,
      sameSite: "lax",
    });
    router.push("/");
  };
  const logout = () => {
    setUser(null);
    cookies.remove("jwt_token");
    router.push("/accounts/login");
  };
  return (
    <AuthContext.Provider value={{ user: authUser, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
