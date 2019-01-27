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
      counter: 0,
      isSearching: false,
      isLoading: true,
      isInvalid: false,
      isEmpty: true
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  async handleSearch(word) {
    this.setState({ isLoading: true, isSearching: true });
    this.setState({ entry: word });
    let wordListJSON = await getDefinitionByWord(word);
    this.setState({
      wordList: wordListJSON,
      isLoading: false,
      isSearching: false
    });
  }

  render() {
    let { entry, wordList, isLoading, isSearching } = this.state;

    return (
      <div className="container">
        <Searchbar onSearchEntry={this.handleSearch} />
        <hr />
        <div className="row">
          <div className="offset-md-2 col-md-8">
            {isLoading && isSearching && (
              <div className="alert alert-primary text-center">
                <h5>Loading...</h5>
              </div>
            )}
            {!isLoading && !isSearching && (
              <WordList wordList={wordList} entry={entry} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
