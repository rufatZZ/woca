import React from "react";
import styled from "styled-components";

const WCol = styled.div`
  width: 100%;
  padding: 0px 15px;
  max-width: ${props =>
    props.grid && props.grid <= 12 ? (100 / 12) * props.grid : 100}%;
  margin-left: ${props =>
    props.offset && props.grid + props.offset <= 12
      ? (100 / 12) * props.offset
      : 0}%;
  flex-grow: ${props => (props.grid && props.grid <= 12 ? 0 : 1)};
  flex-shrink: 0;
  flex-basis: ${props =>
    props.grid && props.grid <= 12 ? (100 / 12) * props.grid : 100}%;
`;

const Col = ({ children, ...props }) => {
  return <WCol {...props}>{children}</WCol>;
};

export default Col;
