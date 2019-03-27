import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";

import Woca from "./components/Woca";

const GlobalStyle = createGlobalStyle`
   body {
      font-family: 'MS-Regular';
      margin: 0;
      padding: 0;
   }
`;

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <Woca />
      </React.Fragment>
    );
  }
}

export default App;
