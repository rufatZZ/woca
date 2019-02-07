import React, { Component } from "react";
//components
import Searchbar from "./Searchbar";
import WordList from "./WordList";
import InvalidEntry from "./InvalidEntry";
import Loading from "../_common/Loading/Loading";
import Error from "../_common/Error/Error";
//actions
import { getDefinitionByWord } from "../../actions/actions";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: "",
      wordList: [],
      errorType: 0,
      counter: 0,
      isSearching: false,
      isLoading: true,
      isInvalid: false,
      isEmpty: true
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.findWord = this.findWord.bind(this);
    this.setParams = this.setParams.bind(this);
    this.getParams = this.getParams.bind(this);
  }
  componentDidMount() {
    let getEntry = this.getParams("word");
    if (getEntry !== undefined && getEntry !== null) {
      this.setState({ entry: getEntry }, () => {
        this.findWord(getEntry);
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      let getEntry = this.getParams("word");
      this.setState({ entry: getEntry }, () => {
        this.findWord(getEntry);
      });
    }
  }

  getParams(word) {
    let search = window.location.search;
    let url = new URLSearchParams(search);
    return word !== undefined ? url.get(word) : false;
  }

  setParams({ query = "" }) {
    const searchParam = new URLSearchParams();
    searchParam.set("word", query);
    return searchParam.toString();
  }

  handleSearch(word) {
    this.setState({ entry: word }, () => {
      let wordHistoryArray = JSON.parse(
        localStorage.getItem("wordHistory") || "[]"
      );
      let wordObj = {
        value: this.state.entry,
        time: new Date().toLocaleString()
      };
      wordHistoryArray.push(wordObj);
      localStorage.setItem("wordHistory", JSON.stringify(wordHistoryArray));
      const url = this.setParams({ query: this.state.entry });
      this.props.history.push(`?${url}`);
    });
  }

  async findWord(word) {
    this.setState({ isLoading: true, isSearching: true, isInvalid: false });
    try {
      let wordListJSON = await getDefinitionByWord(word);
      if (wordListJSON.length === 0) {
        this.setState({
          isEmpty: true,
          errorType: 0,
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
            errorType: 0,
            isLoading: false,
            isInvalid: true,
            isSearching: false
          });
        } else {
          this.setState({
            wordList: wordListJSON,
            isEmpty: false,
            errorType: 0,
            isLoading: false,
            isInvalid: false,
            isSearching: false
          });
        }
      }
    } catch (error) {
      this.setState({
        isEmpty: true,
        errorType: 1,
        isLoading: false,
        isInvalid: false,
        isSearching: false
      });
    }
  }

  render() {
    let {
      entry,
      wordList,
      isLoading,
      isSearching,
      isEmpty,
      errorType,
      isInvalid
    } = this.state;

    const displayLoading = isLoading && isSearching;
    const displayError = !isLoading && !isSearching && isEmpty;
    const displayInvalidEntry = !displayLoading && !isEmpty && isInvalid;
    const displayResults = !displayLoading && !isEmpty;

    return (
      <div>
        <Searchbar onSearchEntry={this.handleSearch} />
        <hr />
        <div className="row">
          <div className="col-sm-10 col-md-10">
            {displayLoading && <Loading />}
            {displayError && <Error type={errorType} />}
            {displayInvalidEntry && <InvalidEntry entry={entry} />}
            {displayResults && <WordList wordList={wordList} entry={entry} />}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
