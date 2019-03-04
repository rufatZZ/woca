import React, { Component } from "react";
import styled from "styled-components";

import Alert from "./Alert";

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

class FlashMessages extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }

  componentDidUpdate(prevProps) {
    if (this.props.message.id !== prevProps.message.id) {
      this.setState({
        messages: [...this.state.messages, this.props.message]
      });
    }
  }

  removeFlash(msgId) {
    // let target = e.currentTarget;
    // target.parentElement.classList.remove("fadeInUp");
    // target.parentElement.classList.add("fadeOutDown");
    setTimeout(() => {
      this.setState(({ messages }) => {
        const _messages = [...messages];
        _messages.splice(
          _messages.findIndex(item => {
            return item.id === msgId;
          }),
          1
        );
        return { messages: _messages };
      });
    }, 500);
  }

  render() {
    const { messages } = this.state;

    return (
      <AlertHolder>
        {messages.map(msg => {
          return (
            <Alert
              key={msg.id}
              message={msg}
              onClose={e => this.removeFlash(msg)}
            />
          );
        })}
      </AlertHolder>
    );
  }
}

export default FlashMessages;
