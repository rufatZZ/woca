import React, { Component } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

import FlashMessages from "./_common/FlashMessages/FlashMessages";
import WRow from "../toolbox/components/Row";

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
        <WRow fluid={true}>
          <SavedTitle>List</SavedTitle>
        </WRow>
        <br />
      </div>
    );
  }
}

export default List;
