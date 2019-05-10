import React, { Component } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

import { saveList } from "../actions/actions";

import FlashMessages from "./_common/FlashMessages/FlashMessages";
import { Row, Button } from "../toolbox/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SavedTitle = styled.h1`
  font-family: "MS-Bold";
  font-size: 2.5rem;
`;

const ModalHolder = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const ModalDialog = styled.div`
  max-width: 500px;
  margin: 2rem auto;
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 0.35rem;
  background-color: #fff;
`;

const ModalHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
`;

const ModalBody = styled.div`
  padding: 1rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #e5e5e5;
  border-radius: 0.35rem;
  box-sizing: border-box;
  outline: none;
  font-size: 1rem;
`;

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      inputValue: "",
      message: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleAddList = this.handleAddList.bind(this);
    this.handleTogglePopup = this.handleTogglePopup.bind(this);
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const list = this.state.inputValue;
    let saveListResponse = await saveList(list);
    if (saveListResponse.isSaved) {
      this.setState({
        isExist: true,
        message: {
          type: "success",
          id: Math.round(Math.random().toFixed(5) * 123456789 * 100000),
          text: "List successfully saved"
        }
      });
    } else {
      this.setState({
        message: {
          type: "danger",
          id: Math.round(Math.random().toFixed(5) * 123456789 * 100000),
          text: "Can't saved list"
        }
      });
    }
  }

  handleTogglePopup() {
    this.setState({ visible: !this.state.visible }, () => {
      if (!this.state.visible) {
        this.setState({ inputValue: "" });
      }
    });
  }

  render() {
    const { visible, inputValue, message } = this.state;

    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>List</title>
        </Helmet>
        <FlashMessages message={message} />
        <Row fluid={true}>
          <SavedTitle>
            <Button onClick={this.handleTogglePopup}>
              <FontAwesomeIcon icon="plus" /> Add List
            </Button>
            List
          </SavedTitle>
        </Row>
        <br />

        {visible && (
          <ModalHolder>
            <ModalDialog>
              <ModalContent>
                <form method="POST" onSubmit={this.handleSubmit}>
                  <ModalHeader>
                    <h5 style={{ marginBottom: "0" }}>Add new List</h5>
                  </ModalHeader>
                  <ModalBody>
                    <div>
                      <Input
                        type="text"
                        value={inputValue}
                        placeholder="Add list title"
                        onChange={this.handleChange}
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button bg="success" onClick={this.handleAddList}>
                      Add
                    </Button>
                    <Button
                      type="button"
                      bg="danger"
                      onClick={this.handleTogglePopup}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </ModalDialog>
          </ModalHolder>
        )}
      </div>
    );
  }
}

export default List;
