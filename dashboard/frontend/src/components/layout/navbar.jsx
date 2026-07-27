import { FaBell } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="navbar">
      <h2>Multi-Node Image Classifier</h2>

      <div className="navbar-right">
        <FaBell />
        <span>Admin</span>
      </div>
    </header>
  );
}
