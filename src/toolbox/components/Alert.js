import React from "react";
import styled, { ThemeProvider } from "styled-components";

const Alert = styled.div`
  font-size: 1rem;
  padding: 0.75rem 1.25rem;
  background-color: ${props => {
    switch (props.bg) {
      case "primary":
        return props.theme.primary + "33";
      case "danger":
        return props.theme.danger + "33";
      case "warning":
        return props.theme.warning + "33";
      case "success":
        return props.theme.success + "33";
      case "secondary":
        return props.theme.secondary + "33";
      case "light":
        return props.theme.light + "33";
      default:
        return props.theme.default + "33";
    }
  }};
  border-radius: 0.35rem;
  border: 1px solid
    ${props => {
      switch (props.bg) {
        case "primary":
          return props.theme.primary + "33";
        case "danger":
          return props.theme.danger + "33";
        case "warning":
          return props.theme.warning + "33";
        case "success":
          return props.theme.success + "33";
        case "secondary":
          return props.theme.secondary + "33";
        case "light":
          return props.theme.light + "33";
        default:
          return props.theme.default + "33";
      }
    }};
  color: ${props => {
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
        return "black";
      default:
        return props.theme.default;
    }
  }};
`;

const theme = {
  primary: "#007bff",
  success: "#28a745",
  danger: "#dc3545",
  warning: "#ffc107",
  light: "#f8f9fa",
  secondary: "#6c757d",
  default: "#852dc8"
};

export const WAlert = ({ children, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <Alert {...props}>{children}</Alert>
    </ThemeProvider>
  );
};
