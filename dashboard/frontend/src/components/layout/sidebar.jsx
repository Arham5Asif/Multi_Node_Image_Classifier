import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaServer,
  FaTasks,
  FaShieldAlt,
  FaRobot,
  FaCog,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>MNIC</h2>

        <p>Distributed System</p>
      </div>

      <nav>
        <NavLink to="/">
          {" "}
          <FaTachometerAlt /> Dashboard{" "}
        </NavLink>

        <NavLink to="/workers">
          {" "}
          <FaServer /> Workers{" "}
        </NavLink>

        <NavLink to="/jobs">
          {" "}
          <FaTasks /> Jobs{" "}
        </NavLink>

        <NavLink to="/cad">
          {" "}
          <FaShieldAlt /> CAD{" "}
        </NavLink>

        <NavLink to="/models">
          {" "}
          <FaRobot /> Models{" "}
        </NavLink>

        <NavLink to="/settings">
          {" "}
          <FaCog /> Settings{" "}
        </NavLink>
      </nav>

      <div className="system-status">🟢 System Online</div>
    </aside>
  );
}
