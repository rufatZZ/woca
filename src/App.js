import React, { Component } from "react";
import { apiKeys, apiUri } from "./constants/constants";

import "./App.css";

const ShordefList = ({ shortdef }) => {
  return shortdef.map(sd => {
    return <li key={sd}>- {sd}</li>;
  });
};

class WordList extends Component {
  render() {
    const { wordList, entry } = this.props;
    let count = 0;

    if (wordList.length > 0) {
      return wordList.map(word => {
        let { uuid = "" } = word.meta;
        let { hw = "", prs = {} } = word.hwi;
        let { mw = "" } = prs[0] || {};
        let { fl = "", shortdef = [] } = word;
        count++;
        return (
          <div className="card" key={uuid} style={{ marginBottom: "5px" }}>
            <div className="card-body" style={{ padding: 0 }}>
              <div className="alert alert-light">
                <div>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      textTransform: "lowercase"
                    }}
                  >
                    <sup>{count}</sup>{entry}
                  </span>
                  - <em>{fl}</em>
                </div>
                <div>
                  <p>
                    {hw} | {mw}
                  </p>
                </div>
              </div>
              <div className="alert alert-info">
                <ul style={{listStyleType:'none', padding: 0}}>
                  <ShordefList shortdef={shortdef} />
                </ul>
              </div>
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
      wordList: [],
      counter: 0
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCounter = this.handleCounter.bind(this);
  }

  handleCounter(){
      this.setState({counter: this.state.counter + 1});
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
          <div className=" offset-md-3 col-md-5 offset-sm-1 col-sm-7">
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
          <div className="offset-md-2 col-md-8">
            {/* <div className="row"> */}
              {/* <div className="col-md-12"> */}
                <WordList wordList={wordList} entry={entry} />
              {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
