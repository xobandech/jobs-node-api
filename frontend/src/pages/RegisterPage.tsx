import RegisterForm from "../components/RegisterForm";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { User } from "../types/types";
import jwtDecode from "jwt-decode";
const RegisterPage = () => {
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
  if (localToken) return <div></div>
  return (
    <div className="flex items-center justify-center">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
