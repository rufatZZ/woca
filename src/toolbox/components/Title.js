import React from "react";
import styled from "styled-components";

const PageTitle = styled.h1`
  font-family: "MS-Bold";
  font-size: 2.5rem;
`;


export const Title = ({children}) => {
    return (
        <PageTitle>{children}</PageTitle>
    );
}

