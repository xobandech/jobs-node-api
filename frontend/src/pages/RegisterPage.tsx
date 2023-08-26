import RegisterForm from "../components/RegisterForm";
import jwtDecode from "jwt-decode";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { User } from "../types/types";
const RegisterPage = () => {
  const { setCurrentUser } = useContext(UserContext);
  const localToken = localStorage.getItem("JTWToken");
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
