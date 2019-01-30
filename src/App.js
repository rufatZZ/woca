import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Search from "./components/Search/Search";
import Header from "./components/Header";

import Sidebar from "./components/Sidebar";
import History from "./components/History/History";
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="container mt-3">
            <Header />
            <div className="row">
              <div className="col-md-3">
                <Sidebar />
              </div>
              <div className="col-md-9">
                <Route exact path="/" render={() => <Redirect to="/search"/>} />
                <Route exact path="/search" component={Search} />
                <Route path="/search/:word" component={Search} />
                <Route path="/history" component={History} />
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
