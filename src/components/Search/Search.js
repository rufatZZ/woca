import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

//components
import Searchbar from "./Searchbar";
import WordList from "./WordList";
import InvalidEntry from "./InvalidEntry";
import Loading from "../_common/Loading/Loading";
import Error from "../_common/Error/Error";

import { Row, Col, Button, Alert } from "../../toolbox/components";

//actions
import {
  saveWord,
  getSavedWord,
  getDefinitionByWord,
  addHistory,
  getAllLists,
  addWordToList,
  removeWordToList
} from "../../actions/actions";
import FlashMessages from "../_common/FlashMessages/FlashMessages";

const DropdownHolder = styled.div`
  max-height: 200px;
  overflow-y: scroll;
  padding: 10px 15px;
  border-radius: 0.35rem;
  box-shadow: 0 3px 3px 0 rgba(60, 64, 67, 0.302),
    0 3px 3px 2px rgba(60, 64, 67, 0.149);
  font-size: ;
`;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: "",
      wordList: [],
      lists: [],
      savedWord: {},
      errorType: 0,
      isExist: false,
      isLoading: true,
      isInvalid: false,
      isEmpty: true,
      connectionError: false,
      message: {},
      dropdownVisible: false
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSaveWord = this.handleSaveWord.bind(this);
    this.findWord = this.findWord.bind(this);
    this.setParams = this.setParams.bind(this);
    this.getParams = this.getParams.bind(this);
    this.handleTogglePopup = this.handleTogglePopup.bind(this);
    this.handleAddToList = this.handleAddToList.bind(this);
  }

  componentWillMount() {
    this.getAllLists();
  }

  componentDidMount() {
    let getEntry = this.getParams("word");
    if (getEntry !== undefined && getEntry !== null) {
      this.setState({ entry: getEntry }, () => {
        this.findWord(getEntry);
        addHistory(getEntry);
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      let getEntry = this.getParams("word");
      this.setState({ entry: getEntry }, () => {
        this.findWord(getEntry);
        addHistory(getEntry);
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
      addHistory(this.state.entry);
      const url = this.setParams({ query: this.state.entry });
      this.props.history.push(`?${url}`);
    });
  }

  handleTogglePopup() {
    this.setState({ dropdownVisible: !this.state.dropdownVisible });
  }

  async handleAddToList(e) {
    const params = {
      title: this.state.entry,
      listId: e.target.value
    };

    const checked = e.target.checked;

    let response = checked ? await addWordToList(params) : await removeWordToList(params);

    //
    // console.log(response);
  }

  async getAllLists() {
    let lists = await getAllLists();
    if (lists.connectionError) {
      this.setState({
        lists: []
      });
    } else {
      if (lists.length > 0) {
        this.setState({
          lists: lists
        });
      } else {
        this.setState({
          lists: []
        });
      }
    }
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
        const savedWord = await getSavedWord(this.state.entry);
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
            savedWord: savedWord.isExist ? savedWord : {},
            isExist: savedWord.isExist ? true : false,
            connectionError: savedWord.connectionError ? true : false
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
      connectionError,
      lists,
      dropdownVisible,
      savedWord
    } = this.state;

    const displayLoading = isLoading && entry.length > 0;
    const displayError = !isLoading && isEmpty;
    const displayInvalidEntry = !displayLoading && !isEmpty && isInvalid;
    const displayResults = !displayLoading && !isEmpty;

    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Woca Search</title>
        </Helmet>
        <Searchbar onSearchEntry={this.handleSearch} />
        <FlashMessages message={message} />

        <Row>
          <Col grid="8">
            {displayLoading && <Loading />}
            {displayError && <Error type={errorType} />}
            {displayInvalidEntry && <InvalidEntry entry={entry} />}
            {displayResults && <WordList wordList={wordList} entry={entry} />}
          </Col>
          <Col grid="2">
            {connectionError ? (
              <Alert bg="danger">Can't connect to server</Alert>
            ) : (
              displayResults &&
              !isInvalid && [
                !isExist ? (
                  <Button
                    key="saveWordBtn"
                    bg="success"
                    size="lg"
                    block={true}
                    onClick={this.handleSaveWord}
                  >
                    Save Word
                  </Button>
                ) : (
                  <Alert bg="success" key="saveWordAlert">
                    Word already saved. <br />
                    Go to <Link to={"/saved"}>Saved words</Link>
                  </Alert>
                ),
                <div key="addListBtn">
                  <Button
                    size="lg"
                    block={true}
                    onClick={this.handleTogglePopup}
                  >
                    Add to the list
                    <FontAwesomeIcon
                      icon="chevron-down"
                      style={{ marginLeft: "5px" }}
                    />
                  </Button>
                  {dropdownVisible && (
                    <DropdownHolder>
                      {lists.map(list => {
                        return (
                          <div key={list._id} style={{ margin: "5px 0" }}>
                            <input
                              type="checkbox"
                              id={`list_${list.title}`}
                              name={list.title}
                              value={list._id}
                              className="checkbox__flag"
                              defaultChecked={savedWord.response.lists.includes(list._id)}
                              onChange={this.handleAddToList}
                            />
                            <label
                              className="checkbox__trigger"
                              htmlFor={`list_${list.title}`}
                            >
                              <svg className="checkbox" viewBox="0 0 24 24">
                                <rect
                                  className="checkbox__rect"
                                  x="3"
                                  y="3"
                                  rx="3"
                                  ry="3"
                                  width="20"
                                  height="20"
                                />
                                <polyline
                                  className="checkbox__line"
                                  points="9 11 12 14 23 3"
                                />
                              </svg>
                              {list.title}
                            </label>
                          </div>
                        );
                      })}
                    </DropdownHolder>
                  )}
                  <div />
                </div>
              ]
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Search;
