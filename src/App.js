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
    this.setState({ isLoading: true, isSearching: true, isInvalid: false });
    this.setState({ entry: word });
    let wordListJSON = await getDefinitionByWord(word);
    if (wordListJSON.length === 0) {
      this.setState({
        isEmpty: true,
        isLoading: false,
        isInvalid: false,
        isSearching: false
      });
    } else {
      const checkTypeOf = typeof wordListJSON[0];
      if (checkTypeOf === "string") {
        this.setState({
          wordList: wordListJSON,
          isEmpty: false,
          isLoading: false,
          isInvalid: true,
          isSearching: false
        });
      } else {
        this.setState({
          wordList: wordListJSON,
          isEmpty: false,
          isLoading: false,
          isInvalid: false,
          isSearching: false
        });
      }
    }
  }

  render() {
    let {
      entry,
      wordList,
      isLoading,
      isSearching,
      isEmpty,
      isInvalid
    } = this.state;

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
            {!isLoading && !isSearching && isEmpty && (
              <div className="alert alert-danger text-center">
                <h4>Words fail us</h4>
                <p>
                  Sorry, the word you’re looking for can’t be found in the
                  dictionary.
                </p>
              </div>
            )}
            {!isLoading && !isSearching && !isEmpty && isInvalid && (
              <div className="alert alert-warning text-center">
                <h4>"{entry}"</h4>
                <p>
                  The word you've entered isn't in the dictionary. Click on a
                  spelling suggestion below or try again using the search bar
                  above.
                </p>
              </div>
            )}
            {!isLoading && !isSearching && !isEmpty && (
              <WordList wordList={wordList} entry={entry} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
