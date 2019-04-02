import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./_partials/Sidebar";
import Search from "./Search/Search";
import Words from "./Words/Words";
import History from "./History/History";
import Saved from "./Saved/Saved";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

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
  width: 100px;
  margin-right: 50px;
`;

const ContentWrapper = styled.div`
  width: calc(100% - 200px);
`;

class Woca extends Component {
  render() {
    return (
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
                  <Route path="/words/:type" component={Words} />

                  <Route path="/history" component={History} />
                  <Route path="/saved" component={Saved} />
                </Container>
              </ContentHolder>
            </ContentWrapper>
          </Flex>
        </Container>
      </Router>
    );
  }
}

export default Woca;
