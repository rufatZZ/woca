import React, { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
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
    const { message } = this.props;
    const alertClassName = `alert ${this.alertClass(message.type)}`;
    return (
      <div className={alertClassName} style={{marginTop: "5px"}}>
        <button className="close" data-dismiss="alert">
          &times;
        </button>
        {message.text}
      </div>
    );
  }
}

export default Alert;
