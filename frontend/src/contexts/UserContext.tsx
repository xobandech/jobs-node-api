import { useState } from "react";
import { createContext } from "react";

export type User = {
  name: string;
  userId: string;
};

export type UserData = {
    user: User
    token: string
}

export type UserContextType = {
  token: string;
  setToken: (token: string) => void;
  currentUser: User;
  setCurrentUser: (arg0: User) => void;
};

export const UserContext = createContext({
  token: "",
  setToken: (token: string) => {},
  currentUser: { name: "", userId: "" },
  setCurrentUser: (user: User) => {},
});

const UserProvider = ({ children }: any) => {
  const localToken = localStorage.getItem("JWTToken")
  const [token, setToken] = useState(localToken ? localToken : "");
  const [currentUser, setCurrentUser] = useState<User>({ name: "", userId: "" });
  const value: UserContextType = {
    token,
    setToken,
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
