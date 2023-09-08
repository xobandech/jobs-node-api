import { useEffect, useState } from "react";
import { createContext } from "react";
import { User, UserContextType } from "../types/types";
import jwtDecode from "jwt-decode";

export const UserContext = createContext<UserContextType>({
  token: "",
  setToken: (token: string) => {},
  currentUser: {name: "", userId: ""},
  setCurrentUser: (user: User) => {},
});

const UserProvider = ({ children }: any) => {
  const localToken = localStorage.getItem("JWTToken")
  const [token, setToken] = useState(localToken ? localToken : "");
  const decoded = localToken && jwtDecode(localToken) as User
  const [currentUser, setCurrentUser] = useState<User>(decoded ? {name: decoded.name, userId: decoded.userId} : {name: "", userId: ""});
  const value: UserContextType = {
    token,
    setToken,
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;