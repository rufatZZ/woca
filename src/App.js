import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

import Search from "./components/Search/Search";
import Sidebar from "./components/Sidebar";
import History from "./components/History/History";
import Saved from "./components/Saved/Saved";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const GlobalStyle = createGlobalStyle`
   body {
      font-family: 'MS-Regular';
      margin: 0;
      padding: 0;
   }

`;

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

const ContentHolder = styled.div`
  padding: 35px 0 0;
`;

const Flex = styled.div`
  display: flex;
`;

const SidebarWrapper = styled.div`
  width: 300px;
`;

const ContentWrapper = styled.div`
  width: calc(100% - 400px);
`;

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
          <Router>
            <Container>
              <Flex>
                <SidebarWrapper>
                  <Sidebar />
                </SidebarWrapper>
                <ContentWrapper>
                  <ContentHolder>
                    <Container>
                      <Route
                        exact
                        path="/"
                        render={() => <Redirect to="/search" />}
                      />
                      <Route exact path="/search" component={Search} />
                      <Route path="/search/:word" component={Search} />
                      <Route path="/history" component={History} />
                      <Route path="/saved" component={Saved} />
                    </Container>
                  </ContentHolder>
                </ContentWrapper>
              </Flex>
            </Container>
          </Router>
      </React.Fragment>
    );
  }
}

export default App;
