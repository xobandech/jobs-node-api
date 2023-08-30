import { useState } from "react";
import { createContext } from "react";
import { User, UserContextType } from "../types/types";

export const UserContext = createContext<UserContextType>({
  token: "",
  setToken: (token: string) => {},
  currentUser: {name: "", userId: ""},
  setCurrentUser: (user: User) => {},
});

const UserProvider = ({ children }: any) => {
  const localToken = localStorage.getItem("JWTToken")
  const [token, setToken] = useState(localToken ? localToken : "");
  const [currentUser, setCurrentUser] = useState<User>({name: "", userId: ""});
  const value: UserContextType = {
    token,
    setToken,
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;