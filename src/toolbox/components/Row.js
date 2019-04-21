import React from "react";
import styled from "styled-components";

const WRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0px ${props => props.fluid ? `-0px`: `-15px` }; 
`;

const Row = ({ children, ...props }) => {
  return <WRow {...props}>{children}</WRow>;
};

export default Row;
