import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarLink = styled(NavLink)`
  font-size: 1rem;
  color: white;
  padding: 15px 15px;
  margin-bottom: 10px;
  transition: all 0.2s ease-in-out;
  &:hover,
  &:focus,
  &.active {
    transition: all 0.2s ease-in-out;
    outline: none !important;
    text-decoration: none !important;
    color: white;
    background-color: #994ed3;
  }
`;

const SidebarWrapper = styled.div`
  position: fixed;
  width: 100px;
  height: 100vh;
  background-color: #852dc8;
  text-align: center;
`;

const SidebarBrand = styled.div`
  color: white;
  margin: 20px 0px 40px;
`;

const SidebarBrandLink = styled(Link)`
  font-family: 'MS-Bold';
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: white;
    opacity: 0.7;
    text-decoration: none;
  }
`;

const SidebarLinkListHolder = styled.div`
  display: flex;
  flex-direction: column;
`;

const SidebarLinkList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarBrand>
        <SidebarBrandLink to="/">Woca</SidebarBrandLink>
      </SidebarBrand>

      <SidebarLinkListHolder>
        <SidebarLinkList>
          <SidebarLink to="/search" title="Search" activeClassName="active">
            <FontAwesomeIcon icon="search" />
          </SidebarLink>
          <SidebarLink to="/history" title="History" activeClassName="active">
            <FontAwesomeIcon icon="history" />
          </SidebarLink>
          <SidebarLink to="/saved" title="Saved" activeClassName="active">
            <FontAwesomeIcon icon="bookmark" />
          </SidebarLink>
          <SidebarLink to="/list" title="List" activeClassName="active">
            <FontAwesomeIcon icon="th-list" />
          </SidebarLink>
          <SidebarLink to="/style_guide" title="Style Guide" activeClassName="active">
            <FontAwesomeIcon icon="code" />
          </SidebarLink>
        </SidebarLinkList>
      </SidebarLinkListHolder>
    </SidebarWrapper>
  );
};

export default Sidebar;
