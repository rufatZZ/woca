import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  font-size: 14px;
  color: white;
  padding: 10px 10px;
  border-radius: 3px;
  &:hover,
  &:focus {
    outline: none !important;
    text-decoration: none !important;
    color: white;
    background-color: #11328d;
  }
`;

const SidebarWrapper = styled.div`
  position: fixed;
  max-width: 250px;
  width: 20%;
  height: 100vh;
  background-color: #11369e;
  padding: 25px 25px;
  transition: 0.5s ease-in-out;
`;

const SidebarBrand = styled.div`
  color: white;
  margin: 0px 0px 40px;
`;

const SidebarBrandLink = styled(Link)`
  font-size: 2.5rem;
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

const SidebarLinkListTitle = styled.span`
  color: white;
  opacity: 0.4;
  font-size: 12px;
`;

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarBrand>
        <SidebarBrandLink to="/">Woca</SidebarBrandLink>
      </SidebarBrand>

      <SidebarLinkListHolder>
        <SidebarLinkList>
          <SidebarLinkListTitle>Vocabulary</SidebarLinkListTitle>
          <SidebarLink to="/">Search</SidebarLink>
          <SidebarLink to="/history">History</SidebarLink>
          <SidebarLink to="/saved">Saved</SidebarLink>
        </SidebarLinkList>
      </SidebarLinkListHolder>
    </SidebarWrapper>
  );
};

export default Sidebar;
