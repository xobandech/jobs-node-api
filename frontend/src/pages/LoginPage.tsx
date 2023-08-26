import jwtDecode from "jwt-decode";
import { useContext } from "react";
import LoginForm from "../components/LoginForm";
import { UserContext, User } from "../contexts/UserContext";

const LoginPage = () => {
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
  if (localToken) return <div></div>;
  return (
    <div className="flex justify-center">
      <LoginForm />
    </div>
  );
};
export default LoginPage;
