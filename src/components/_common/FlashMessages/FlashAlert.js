import React, { Component } from "react";
import styled from 'styled-components';
import { Alert } from "../../../toolbox/components";

const FlasAlertItemRemoveIcon = styled.div`
  background-image: url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE4cHgiIHdpZHRoPSIxOHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0iIzAwMDAwMCI+CiA8cGF0aCBkPSJtMCAwaDE4djE4aC0xOHpoMTh2MThoLTE4eiIgZmlsbD0ibm9uZSIvPgogPHBhdGggZD0ibTE0LjUzIDQuNTNsLTEuMDYtMS4wNi00LjQ3IDQuNDctNC40Ny00LjQ3LTEuMDYgMS4wNiA0LjQ3IDQuNDctNC40NyA0LjQ3IDEuMDYgMS4wNiA0LjQ3LTQuNDcgNC40NyA0LjQ3IDEuMDYtMS4wNi00LjQ3LTQuNDd6Ii8+Cjwvc3ZnPgo=);
  display: inline-block;
  width: 15px;
  height: 15px;
  position: relative;
  top: 2px;
  margin-right: 5px;
  background-repeat: no-repeat;
  background-size: 13px 15px;
`;
class FlashAlert extends Component {
  componentDidMount() {
    this.timer = setTimeout(this.props.onClose.bind(this), this.props.timeout);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  alertClass(type) {
    let classes = {
      error: "danger",
      alert: "warning",
      notice: "info",
      success: "success"
    };
    return classes[type] || classes.success;
  }

  render() {
    const { message, onClose } = this.props;
    return (
      <Alert
        bg={`${this.alertClass(message.type)}`}
        className="animated fadeInUp"
        style={{ marginTop: "5px" }}
      >

        <FlasAlertItemRemoveIcon onClick={e => onClose(message.id)} />

        {message.text}
      </Alert>
    );
  }
}

FlashAlert.defaultProps = {
  timeout: 2000
};

export default FlashAlert;
