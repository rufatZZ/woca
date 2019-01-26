import React, { Component } from "react";
//components
import Searchbar from "./components/Searchbar";
import WordList from "./components/WordList";
//actions
import { getDefinitionByWord } from "./actions/actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: "",
      wordList: [],
      counter: 0
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  async handleSearch(word) {
    this.setState({ entry: word });
    let wordListJSON = await getDefinitionByWord(word);
    this.setState({ wordList: wordListJSON });
  }

  render() {
    let { entry, wordList } = this.state;

    return (
      <div className="container">
        <Searchbar onSearchEntry={this.handleSearch} />
        <hr />
        <div className="row">
          <div className="offset-md-2 col-md-8">
            <WordList wordList={wordList} entry={entry} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
