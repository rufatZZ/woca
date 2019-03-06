import React, { Component } from "react";

class Alert extends Component {
  componentDidMount() {
    this.timer = setTimeout(this.props.onClose.bind(this), this.props.timeout);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  alertClass(type) {
    let classes = {
      error: "alert-danger",
      alert: "alert-warning",
      notice: "alert-info",
      success: "alert-success"
    };
    return classes[type] || classes.success;
  }

  render() {
    const { message, onClose } = this.props;
    return (
      <div
        className={`alert ${this.alertClass(message.type)} animated fadeInUp`}
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
      </div>
    );
  }
}

Alert.defaultProps = {
  timeout: 2000
};

export default Alert;
