import React, { Component } from "react";
//components
import Searchbar from "./components/Searchbar";
import WordList from "./components/WordList";
import InvalidEntry from "./components/InvalidEntry";
import Loading from "./components/_common/Loading/Loading";
import Error from "./components/_common/Error/Error";
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

    const displayLoading = isLoading && isSearching;
    const displayError = !isLoading && !isSearching && isEmpty;
    const displayInvalidEntry = !displayLoading && !isEmpty && isInvalid;
    const displayResults = !displayLoading && !isEmpty;

    return (
      <div className="container">
        <Searchbar onSearchEntry={this.handleSearch} />
        <hr />
        <div className="row">
          <div className="offset-md-2 col-md-8">
            {displayLoading && <Loading />}
            {displayError && <Error />}
            {displayInvalidEntry && <InvalidEntry entry={entry} />}
            {displayResults && <WordList wordList={wordList} entry={entry} />}
          </div>
        </div>
        <br/>
      </div>
    );
  }
}

export default App;
