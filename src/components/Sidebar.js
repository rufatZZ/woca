import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <ul className="list-group">
      <li className="list-group-item">
        <Link to="/">Search</Link>
      </li>
      <li className="list-group-item">
        <Link to="/history">History</Link>
      </li>
      <li className="list-group-item">
        <Link to="/">Saved</Link>
      </li>
    </ul>
  );
};

export default Sidebar;
