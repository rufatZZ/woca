import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  color: black;
  border-radius: 0px!important;
  &:first-child {
    border-top-right-radius: 3px !important;
    border-top-left-radius: 3px !important;
  }
  &:last-child {
    border-bottom-right-radius: 3px !important;
    border-bottom-left-radius: 3px !important;
  }
  &:hover {
    color: white;
    background-color: #007bff;
  }
`;

const Sidebar = () => {
  return (
    <div className="list-group">
      <SidebarLink to="/" className="list-group-item">
        Search
      </SidebarLink>
      <SidebarLink to="/history" className="list-group-item">
        History
      </SidebarLink>
      <SidebarLink to="/" className="list-group-item">
        Saved
      </SidebarLink>
    </div>
  );
};

export default Sidebar;
