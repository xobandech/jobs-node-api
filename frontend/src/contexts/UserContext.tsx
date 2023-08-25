import { ReactElement, ReactNode, useState } from "react";
import { createContext } from "vm";

export type User = {
  name: string;
  email: string;
};

export type UserContextType = {
  token: string;
  setToken: (token: "") => void;
  currentUser: User;
  setCurrentUser: (arg0: User) => void;
};

const UserContext = createContext({
  token: "",
  setToken: () => null,
  currentUser: { name: "", email: "" },
  setCurrentUser: (user: User) => null,
});

const UserProvider = ({ children }: any) => {
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState<User>({ name: "", email: "" });
  const value: UserContextType = {
    token,
    setToken,
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider