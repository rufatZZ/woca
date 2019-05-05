import React, { Component } from "react";
import { Alert, Button } from "../../../toolbox/components";

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
        <Button
          bg="glass"
          data-dismiss="alert"
          onClick={e => onClose(message.id)}
        >
          &times;
        </Button>
        {message.text}
      </Alert>
    );
  }
}

FlashAlert.defaultProps = {
  timeout: 2000
};

export default FlashAlert;
