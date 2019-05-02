import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./_partials/Sidebar";
import Search from "./Search/Search";
import Saved from "./Saved";
import History from "./History";
import List from "./List";
import StyleGuide from "./StyleGuide";

import { Row } from "../toolbox/components/";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const ContentHolder = styled.div`
  padding: 35px 0 0;
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
        <Row fluid={true}>
          <SidebarWrapper>
            <Sidebar />
          </SidebarWrapper>
          <ContentWrapper>
            <ContentHolder>
              <Route exact path="/" render={() => <Redirect to="/search" />} />
              <Route exact path="/search" component={Search} />
              <Route path="/search/:word" component={Search} />
              <Route path="/style_guide" component={StyleGuide} />
              <Route path="/history" component={History} />
              <Route path="/saved" component={Saved} />
              <Route path="/list" component={List} />
            </ContentHolder>
          </ContentWrapper>
        </Row>
      </Router>
    );
  }
}

export default Woca;
