import { useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const NavBar = () => {
  const { setCurrentUser, currentUser } = useContext(UserContext)
  return (
    <>
        <div className="flex text-[#f4f4f4] p-2 justify-between w-full bg-[#21273D]">
          <NavLink className="ml-4 text-lg flex items-center" to="/jobs">
            Browse Jobs
          </NavLink>
          <button disabled
              style={{ fontFamily: "Oswald, sans-serif", fontSize: "2.5rem" }}
              className="text-4xl"
            >
              TODOS
          </button>
          <button onClick={() => {
            if (currentUser) {
              setCurrentUser(undefined)
              localStorage.removeItem("JWTToken")
              return
            }
            window.location.href = "/auth/login"
          }} className="mr-4 text-lg">{currentUser ? "Sign Out" : "Sign In"}</button>
        </div>
        <Outlet />
    </>
  );
};

export default NavBar;
