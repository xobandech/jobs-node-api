import { useContext } from "react";
import { Outlet, NavLink, redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const NavBar = () => {
  const { setCurrentUser, currentUser } = useContext(UserContext);

  return (
    <>
      <div className="flex text-[#f4f4f4] p-2 justify-between w-full bg-[#21273D]">
        <NavLink className="ml-4 text-lg flex items-center" to="/jobs">
          Browse Jobs
        </NavLink>
        <button
          disabled
          style={{ fontFamily: "Oswald, sans-serif", fontSize: "2.5rem" }}
          className="text-4xl"
        >
          JOBS MANAGER
        </button>
        <NavLink
          to={currentUser?.name ? "/" : "/auth/login"}
          onClick={() => {
            if (currentUser?.name) {
              setCurrentUser(undefined);
              localStorage.removeItem("JWTToken");
              redirect("/");
            }
          }}
          type="reset"
          className="mr-4 text-lg my-auto"
        >
          {currentUser?.name.length ? "Sign Out" : "Sign In"}
        </NavLink>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
