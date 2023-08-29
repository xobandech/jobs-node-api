import { Outlet, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div className="items-center ">
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
          <button className="mr-4 text-lg">Sign Out</button>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default NavBar;
