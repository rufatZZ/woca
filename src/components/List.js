import React, { Component } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

import FlashMessages from "./_common/FlashMessages/FlashMessages";
import { Row } from "../toolbox/components";

const SavedTitle = styled.h1`
  font-family: "MS-Bold";
  font-size: 2.5rem;
`;

class List extends Component {
  render() {
    let message = "";

    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>List</title>
        </Helmet>
        <FlashMessages message={message} />
        <Row fluid={true}>
          <SavedTitle>List</SavedTitle>
        </Row>
        <br />
      </div>
    );
  }
}

export default List;
