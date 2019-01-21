import React, { Component } from "react";
import { apiKeys, apiUri } from "./constants/constants";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.getDefinitionByWord = this.getDefinitionByWord.bind(this);
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleClick(e) {
    let word = this.state.inputValue;

    fetch(apiUri("learners", word, apiKeys.learnersKey))
      .then(function(response) {
        return response.json();
      })
      // return fetch(url, {
      //     method: "POST", // *GET, POST, PUT, DELETE, etc.
      //     mode: "cors", // no-cors, cors, *same-origin
      //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      //     credentials: "same-origin", // include, *same-origin, omit
      //     headers: {
      //         "Content-Type": "application/json",
      //         // "Content-Type": "application/x-www-form-urlencoded",
      //     },
      //     redirect: "follow", // manual, *follow, error
      //     referrer: "no-referrer", // no-referrer, *client
      //     body: JSON.stringify(data), // body data type must match "Content-Type" header
      // })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
      });
  }

  render() {
    let { inputValue } = this.state;

    return (
      <div className="container">
        <br />
        <div className="row">
          <div className=" offset-md-3 col-md-5">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Enter the word"
                value={inputValue}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="col-md-1">
            <button className="btn btn-primary" onClick={this.handleClick}>
              Search
            </button>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-8">
            <ul className="list-group">
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Morbi leo risus</li>
              <li className="list-group-item">Porta ac consectetur ac</li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
