import jwtDecode from "jwt-decode";
import { useContext } from "react";
import LoginForm from "../components/LoginForm";
import { UserContext } from "../contexts/UserContext";
import { User } from "../types/types";

const LoginPage = () => {
  const { setCurrentUser } = useContext(UserContext);
  const localToken = localStorage.getItem("JWTToken");
  if (localToken) {
    const decodeToken = async () => {
      
      const user = (await jwtDecode(localToken)) as User;
      setCurrentUser(user);
      window.location.replace("/jobs");
    };
    decodeToken();
  }
  if (localToken) return <div></div>;
  return (
    <div className="flex h-full justify-center">
      <LoginForm />
    </div>
  );
};
export default LoginPage;
