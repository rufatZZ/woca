import React, { Component } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

import FlashMessages from "./_common/FlashMessages/FlashMessages";
import { Row, Button } from "../toolbox/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SavedTitle = styled.h1`
  font-family: "MS-Bold";
  font-size: 2.5rem;
`;

const ModalHolder = styled.div`
  position: fixed;
  background-color: rgba(0,0,0,.5);
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
  border-radius: .35rem;
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
    border-radius: .35rem;
    box-sizing: border-box;
    outline: none;
    font-size: 1rem
`;

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      inputValue: ''
    };

    this.handleChange = this.handleChange.bind(this);
    // this.handleAddList = this.handleAddList.bind(this);
    this.handleTogglePopup = this.handleTogglePopup.bind(this);
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }
  handleTogglePopup() {
    this.setState({ visible: !this.state.visible }, () => {
      if (!this.state.visible) {
        this.setState({ inputValue: '' });
      }
    });
  }


  render() {
    let message = "";
    const { visible, inputValue } = this.state;

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
                <ModalHeader><h5 style={{ marginBottom: '0' }}>Add new List</h5></ModalHeader>
                <ModalBody>
                  <div>
                    <Input type="text" value={inputValue} placeholder="Add list title" onChange={this.handleChange} />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button bg="success" onClick={this.handleAddList}>
                    Add
                </Button>
                  <Button bg="danger" onClick={this.handleTogglePopup}>
                    Cancel
                </Button>
                </ModalFooter>
              </ModalContent>
            </ModalDialog>
          </ModalHolder>
        )}
      </div>
    );
  }
}

export default List;
