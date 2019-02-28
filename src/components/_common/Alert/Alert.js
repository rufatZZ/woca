import React, { Component } from "react";
import styled from "styled-components";

const AlertHolder = styled.div`
  width: 300px;
  height: 80px;
  z-index: 9;
  position: fixed;
  right: 30px;
  bottom: 40px;
  display: flex;
  flex-direction: column-reverse;
`;

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

  handleClose() {}

  render() {
    const { messages, onCloseAlert } = this.props;
    console.log(onCloseAlert);
    return (
      <div>
        <AlertHolder>
          {messages.map(msg => {
            return (
              <div
                key={msg.id}
                className={`alert ${this.alertClass(msg.type)}`}
                style={{ marginTop: "5px" }}
              >
                <button
                  className="close"
                  data-dismiss="alert"
                  onClick={e => onCloseAlert(msg.text)}
                >
                  &times;
                </button>
                {msg.text}
              </div>
            );
          })}
        </AlertHolder>
      </div>
    );
  }
}

export default Alert;
