import { NavLink } from "react-router-dom";
import "./style.scss";

export const Nav = () => {
  return (
    <nav className="nav">
      <NavLink to={"/"}>Student</NavLink>
      <NavLink to={"/teacher"}>Teacher</NavLink>
      <NavLink to={"/class"}>Class</NavLink>
      <NavLink to={"/school"}>School</NavLink>
    </nav>
  );
};
