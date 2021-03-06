import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../constants/Theme";

const WButton = styled.button`
  display: ${props => (props.block ? `block` : ``)};
  vertical-align: middle;
  width: ${props => (props.block ? `100%` : ``)};
  border: 1px solid transparent;
  border-radius: 0.35rem;
  line-height: 1.5;
  font-size: ${props => {
    switch (props.size) {
      case "sm":
        return ".875rem";
      case "lg":
        return "1.25rem";
      default:
        return "1rem";
    }
  }};
  padding: ${props => {
    switch (props.size) {
      case "sm":
        return ".25rem .5rem";
      case "lg":
        return ".5rem 1rem";
      default:
        return ".375rem .75rem";
    }
  }};
  color: ${props => {
    switch (props.bg) {
      case "primary":
        return "white";
      case "danger":
        return "white";
      case "warning":
        return "black";
      case "light":
        return "black";
      case "success":
        return "white";
      default:
        return "white";
    }
  }};
  background-color: ${props => {
    switch (props.bg) {
      case "primary":
        return props.theme.primary;
      case "danger":
        return props.theme.danger;
      case "warning":
        return props.theme.warning;
      case "success":
        return props.theme.success;
      case "secondary":
        return props.theme.secondary;
      case "light":
        return props.theme.light;
      case "glass":
        return props.theme.glass;
      default:
        return props.theme.default;
    }
  }};

  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    opacity: 0.9;
    text-decoration: none;
    color: ${props => {
      switch (props.bg) {
        case "primary":
          return "white";
        case "danger":
          return "white";
        case "warning":
          return "black";
        case "light":
          return "black";
        case "success":
          return "white";
        case "glass":
          return "grey";
        default:
          return "white";
      }
    }};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem
      ${props => {
        switch (props.bg) {
          case "primary":
            return props.theme.primary + "80";
          case "danger":
            return props.theme.danger + "80";
          case "warning":
            return props.theme.warning + "80";
          case "success":
            return props.theme.success + "80";
          case "secondary":
            return props.theme.secondary + "80";
          case "light":
            return props.theme.secondary + "80";
          case "glass":
            return props.theme.glass;
          default:
            return props.theme.default + "80";
        }
      }};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Button = ({ as: tag = "button", children, ...props }) => {
  let _tag = tag === "Link" ? Link : tag;
  const Composed = WButton.withComponent(_tag);

  return (
    <ThemeProvider theme={theme}>
      <Composed {...props}>{children}</Composed>
    </ThemeProvider>
  );
};
