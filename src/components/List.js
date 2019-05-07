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

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.handleTogglePopup = this.handleTogglePopup.bind(this);
  }

  handleTogglePopup() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    let message = "";
    const { visible } = this.state;

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
                <div>pop up</div>
                <Button onClick={this.handleTogglePopup}>
                  {/* <FontAwesomeIcon icon="close" />  */}
                  Close
                </Button>
              </ModalContent>
            </ModalDialog>
          </ModalHolder>
        )}
      </div>
    );
  }
}

export default List;
