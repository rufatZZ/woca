import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Search from "./components/Search/Search";
import Header from "./components/Header";

import Sidebar from "./components/Sidebar";
import History from "./components/History/History";

import styled from "styled-components";

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
      <div>
        <Router>
          <Container>
            {/* <Header /> */}
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
                  </Container>
                </ContentHolder>
              </ContentWrapper>
            </Flex>
          </Container>
        </Router>
      </div>
    );
  }
}

export default App;
