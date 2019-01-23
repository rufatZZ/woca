import React, { Component } from "react";
import { apiKeys, apiUri } from "./constants/constants";

import "./App.css";

class WordList extends Component {
  render() {
    const { wordList, entry } = this.props;

    if (wordList.length > 0) {
      return wordList.map(word => {
        let { uuid = "" } = word.meta;
        let { hw = "", prs = {} } = word.hwi;
        let { mw = "" } = prs[0] || {}; 
        let { fl = "" } = word;
        return (
          <div className="card" key={uuid} style={{ marginBottom: "5px" }}>
            <div className="card-body">
              <div>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    textTransform: "lowercase"
                  }}
                >
                  {entry}
                </span>
                - <em>{fl}</em>
              </div>
              <p>
                {hw} | {mw}
              </p>
            </div>
          </div>
        );
      });
    } else {
      return [];
    }
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      entry: "",
      wordList: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleClick(e) {
    let word = this.state.inputValue;
    this.setState({ entry: word });

    fetch(apiUri("collegiate", word, apiKeys.dictionaryKey))
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        return this.setState({ wordList: myJson });
      });
  }

  render() {
    let { inputValue, entry, wordList } = this.state;

    return (
      <div className="container">
        <br />
        <div className="row">
          <div className=" offset-md-3 col-md-5 offset-sm-3 col-sm-5">
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
          <div className="col-md-1 col-sm-1">
            <button className="btn btn-primary" onClick={this.handleClick}>
              Search
            </button>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12">
                <WordList wordList={wordList} entry={entry} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
