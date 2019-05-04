import React, { Component } from "react";
import { WAlert, WButton } from "../../../toolbox/components";

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
      <WAlert
        bg={`${this.alertClass(message.type)}`}
        className="animated fadeInUp"
        style={{ marginTop: "5px" }}
      >
        <WButton
          bg="glass"
          data-dismiss="alert"
          onClick={e => onClose(message.id)}
        >
          &times;
        </WButton>
        {message.text}
      </WAlert>
    );
  }
}

FlashAlert.defaultProps = {
  timeout: 2000
};

export default FlashAlert;
