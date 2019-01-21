import React, { Component } from "react";
import { apiKeys, apiUri } from "./constants/constants";

import "./App.css";

class WordList extends Component {
  render() {
    const { wordList } = this.props;

    if(wordList.length > 0){
        return wordList.map(word => {
          return (
            <li className="list-group-item" key={word.meta.uuid}>{word.meta["app-shortdef"].def[0]}</li>
          );
        });
    }else{
        return [];
    }
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
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

    fetch(apiUri("learners", word, apiKeys.learnersKey))
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        return this.setState({ wordList: myJson });
      });
  }

  render() {
    let { inputValue, wordList } = this.state;

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
              <WordList wordList={wordList} />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
