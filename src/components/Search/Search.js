import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
//components
import Searchbar from "./Searchbar";
import WordList from "./WordList";
import InvalidEntry from "./InvalidEntry";
import Loading from "../_common/Loading/Loading";
import Error from "../_common/Error/Error";
import WButton from "../../toolbox/components/Button";
import WAlert from "../../toolbox/components/Alert";
import WRow from "../../toolbox/components/Row";
import Col from "../../toolbox/components/Col";

//actions
import {
  getDefinitionByWord,
  saveWord,
  getSavedWord
} from "../../actions/actions";
import FlashMessages from "../_common/FlashMessages/FlashMessages";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: "",
      wordList: [],
      errorType: 0,
      isExist: false,
      isLoading: true,
      isInvalid: false,
      isEmpty: true,
      connectionError: false,
      message: {}
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSaveWord = this.handleSaveWord.bind(this);
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
        sessionStorage.getItem("wordHistory") || "[]"
      );
      let wordObj = {
        value: this.state.entry,
        time: new Date().toLocaleString()
      };
      wordHistoryArray.push(wordObj);
      sessionStorage.setItem("wordHistory", JSON.stringify(wordHistoryArray));
      const url = this.setParams({ query: this.state.entry });
      this.props.history.push(`?${url}`);
    });
  }

  async handleSaveWord() {
    let entry = this.state.entry;
    let saveWordReponse = await saveWord(entry);
    if (saveWordReponse.isSaved) {
      this.setState({
        isExist: true,
        message: {
          type: "success",
          id: Math.round(Math.random().toFixed(5) * 123456789 * 100000),
          text: "Word successfully saved"
        }
      });
    } else {
      this.setState({
        message: {
          type: "danger",
          id: Math.round(Math.random().toFixed(5) * 123456789 * 100000),
          text: "Cant saved word"
        }
      });
    }
  }

  async findWord(word) {
    this.setState({ isLoading: true, isInvalid: false, isExist: false });
    try {
      let wordListJSON = await getDefinitionByWord(word);
      if (wordListJSON.length === 0) {
        this.setState({
          isEmpty: true,
          errorType: 0,
          isLoading: false,
          isInvalid: false
        });
      } else {
        const checkWordExist = await getSavedWord(this.state.entry);
        const checkTypeOf = typeof wordListJSON[0];
        if (checkTypeOf === "string") {
          this.setState({
            wordList: wordListJSON,
            isEmpty: false,
            errorType: 0,
            isLoading: false,
            isInvalid: true
          });
        } else {
          this.setState({
            wordList: wordListJSON,
            isEmpty: false,
            errorType: 0,
            isLoading: false,
            isInvalid: false,
            isExist: checkWordExist.isExist ? true : false,
            connectionError: checkWordExist.connectionError ? true : false
          });
        }
      }
    } catch (error) {
      this.setState({
        isEmpty: true,
        errorType: 1,
        isLoading: false,
        isInvalid: false
      });
    }
  }

  render() {
    let {
      entry,
      wordList,
      isLoading,
      isEmpty,
      errorType,
      isInvalid,
      isExist,
      message,
      connectionError
    } = this.state;

    const displayLoading = isLoading && entry.length > 0;
    const displayError = !isLoading && isEmpty;
    const displayInvalidEntry = !displayLoading && !isEmpty && isInvalid;
    const displayResults = !displayLoading && !isEmpty;

    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Search</title>
        </Helmet>
        <Searchbar onSearchEntry={this.handleSearch} />
        <FlashMessages message={message} />

        <WRow>
          <Col grid="8">
            {displayLoading && <Loading />}
            {displayError && <Error type={errorType} />}
            {displayInvalidEntry && <InvalidEntry entry={entry} />}
            {displayResults && <WordList wordList={wordList} entry={entry} />}
          </Col>
          <Col grid="2">
            {connectionError ? (
              <WAlert bg="danger">Can't connect to server</WAlert>
            ) : (
                displayResults && !isInvalid &&
                ( !isExist ? (
                  <WButton
                    bg="success" size="lg" block={true}
                    onClick={this.handleSaveWord}
                  >
                    Save Word
                </WButton>
                ) : (
                    <WAlert bg="success">
                      Word already saved. <br />
                      Go to <Link to={"/saved"}>Saved words</Link>
                    </WAlert>
                  ))
              )}
          </Col>
        </WRow>
      </div>
    );
  }
}

export default Search;
