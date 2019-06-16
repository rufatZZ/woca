import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";

import Woca from "./components/Woca";

const GlobalStyle = createGlobalStyle`
   *{
     font-family: inherit;
   }

   body {
      font-family: 'MS-Regular';
      margin: 0;
      padding: 0;
      font-size: 1rem;
   }

    a {
      background-color: transparent;
      text-decoration: none;
      outline: none;
    }

   hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0,0,0,.1);
   }

   h1,h2,h3,h4,h5,h6 {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
    font-family: 'MS-SemiBold';

  }

  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.75rem;
  }
  h4 {
    font-size: 1.5rem;
  }
  h5 {
    font-size: 1.25rem;
  }
  h6 {
    font-size: 1rem;
  }
  .text-center{
    text-align:center;
  }


  ::-webkit-scrollbar-track
  {
      border: 1px solid #e5e5e5;
      background-color: #F5F5F5;
  }

  ::-webkit-scrollbar
  {
      width: 10px;
      background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb
  {
      background-color: #a7a7a7;  
  }

  .fa-palette path{
    pointer-events: none;
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
