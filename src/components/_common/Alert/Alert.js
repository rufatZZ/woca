import React, { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={alertClassNames}>
        <button className="close" data-dismiss="alert">
          &times;
        </button>
        {message.text}
      </div>
    );
  }
}

export default Alert;
