import React, { Component } from "react";
import WAlert from '../../../toolbox/components/Alert';

class Alert extends Component {
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
        bg={`${this.alertClass(message.type)}`} className="animated fadeInUp"
        style={{ marginTop: "5px" }}
      >
        <button
          className="close"
          data-dismiss="alert"
          onClick={e => onClose(message.id)}
        >
          &times;
        </button>
        {message.text}
      </WAlert>
    );
  }
}

Alert.defaultProps = {
  timeout: 2000
};

export default Alert;
