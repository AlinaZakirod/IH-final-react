import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/boards" style={{ textDecoration: "none" }}>
            Your Activity | Boards:
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
