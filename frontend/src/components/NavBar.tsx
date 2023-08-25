import { Outlet, NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <>
      <div>
        <NavLink to="/jobs">Browse my Jobs</NavLink>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
