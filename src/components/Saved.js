import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getAllSavedWords, deleteSavedWord, removeWordFromList } from "../actions/actions";

import FlashMessages from "./_common/FlashMessages/FlashMessages";
import Loading from "./_common/Loading/Loading";

import { getParams } from "../toolbox/helpers";
import { Row, Col, Alert, Title, Button } from "../toolbox/components";
import { listColors } from "../toolbox/constants/Theme";

const SavedWordBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 200px;
  padding: 10px 20px 20px;
  margin: 0px 25px 30px 0px;
  border-radius: 0.35rem;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 3px 3px 0 rgba(60, 64, 67, 0.302),
      0 3px 3px 2px rgba(60, 64, 67, 0.149);
    transition: all 0.2s ease-in-out;
  }
`;

const SavedWordBoxTitle = styled.h2`
  text-transform: capitalize;
  font-size: 1.5rem;
  font-family: "MS-Bold";
  opacity: 0.6;
`;

const SavedWordBoxBody = styled.div`
  position: relative;
  height: 90%;
`;

const SavedWordBoxFooter = styled.div`
  height: 10%;
  font-size: 1rem;
`;

const SavedWordBoxFooterIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  opacity: 0.6;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

const SavedWordListItemRemoveIcon = styled.div`
  background-image: url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE4cHgiIHdpZHRoPSIxOHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0iIzAwMDAwMCI+CiA8cGF0aCBkPSJtMCAwaDE4djE4aC0xOHpoMTh2MThoLTE4eiIgZmlsbD0ibm9uZSIvPgogPHBhdGggZD0ibTE0LjUzIDQuNTNsLTEuMDYtMS4wNi00LjQ3IDQuNDctNC40Ny00LjQ3LTEuMDYgMS4wNiA0LjQ3IDQuNDctNC40NyA0LjQ3IDEuMDYgMS4wNiA0LjQ3LTQuNDcgNC40NyA0LjQ3IDEuMDYtMS4wNi00LjQ3LTQuNDd6Ii8+Cjwvc3ZnPgo=);
  display: none;
  width: 14px;
  height: 12px;
  position: relative;
  top: 2px;
  margin-left: 5px;
  background-repeat: no-repeat;
  background-size: 12px 13px;
`;

const SavedWordListItem = styled(Link)`
  font-size: 12px;
  display: inline-block;
  color: #5a5858;
  border-radius: 0.35rem;
  margin: 2px;
  padding: 3px;
  background-color: #${props => props.bgcolor};
  border: 1px solid ${props => props.bordercolor};

  &:hover ${SavedWordListItemRemoveIcon}{
    display: inline-block;    
  }
`;


class Saved extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savedList: [],
      message: {},
      isLoading: true,
      isEmpty: true,
      connectionError: false
    };

    this.getAllSavedWords = this.getAllSavedWords.bind(this);
    this.handleDeleteSavedWord = this.handleDeleteSavedWord.bind(this);
    this.handleDeleteSavedWordList = this.handleDeleteSavedWordList.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentWillMount() {
    this.getAllSavedWords();
  }

  componentDidUpdate(prevProps) {
    let getEntry = getParams("list");

    if (this.props.location.search !== prevProps.location.search) {
      if (getEntry !== undefined && getEntry !== null) {
        this.getAllSavedWords(getEntry);
      } else {
        this.getAllSavedWords();
      }
    }
  }

  handleReset() {
    this.props.history.push("/saved");
  }

  async handleDeleteSavedWord(word_id) {
    let deleteResponse = await deleteSavedWord(word_id);
    if (deleteResponse.isDeleted) {
      this.getAllSavedWords();
      this.setState({
        message: {
          type: "error",
          id: Math.round(Math.random().toFixed(5) * 123456789 * 100000),
          text: "Word deleted"
        }
      });
    } else {
      this.setState({
        message: {
          type: "alert",
          id: Math.round(Math.random().toFixed(5) * 123456789 * 100000),
          text: "Cant delete word"
        }
      });
    }
  }

  async handleDeleteSavedWordList(e, title, listId) {
    e.preventDefault();
    if (title !== undefined && listId !== undefined) {
      const params = {
        title,
        listId
      };
      const response = await removeWordFromList(params);
    }
  }

  async getAllSavedWords(list = "") {
    let savedList = await getAllSavedWords(list);
    if (savedList.connectionError) {
      this.setState({
        savedList: [],
        isLoading: false,
        isEmpty: true,
        connectionError: true
      });
    } else {
      if (savedList.length > 0) {
        this.setState({
          savedList: savedList,
          isLoading: false,
          isEmpty: false
        });
      } else {
        this.setState({ savedList: [], isLoading: false, isEmpty: true });
      }
    }
  }

  render() {
    let {
      savedList,
      message,
      isLoading,
      isEmpty,
      connectionError
    } = this.state;

    savedList.sort(function (a, b) {
      return Date.parse(b.time) - Date.parse(a.time);
    });

    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Saved</title>
        </Helmet>
        <FlashMessages message={message} />
        <Row fluid={true}>
          <Title>
            {!connectionError && (
              <Button bg="danger" onClick={this.handleReset}>
                <FontAwesomeIcon icon="undo" /> Reset
              </Button>
            )}
            Saved
          </Title>
        </Row>
        <br />
        {isLoading && <Loading />}

        {connectionError && (
          <Row>
            <Col>
              <Alert bg="danger">
                <h3 className="text-center">Can't connect to server</h3>
              </Alert>
            </Col>
          </Row>
        )}

        {!isLoading &&
          !connectionError &&
          (isEmpty ? (
            <Row>
              <Col>
                <Alert bg="warning">
                  <h3 className="text-center">Saved list is empty</h3>
                </Alert>
              </Col>
            </Row>
          ) : (
              <Row>
                {savedList.map(word => {
                  return (
                    <SavedWordBox key={word._id}>
                      <SavedWordBoxBody>
                        <SavedWordBoxTitle>{word.title}</SavedWordBoxTitle>
                        <div style={{ position: "absolute", bottom: "10%" }}>
                          {word.lists.map(list => {
                            return (
                              <SavedWordListItem
                                to={`?list=${list._id}`}
                                key={list._id}
                                bgcolor={
                                  listColors.find(
                                    color => color.name === list.color
                                  ).value
                                }
                                bordercolor={
                                  listColors.find(
                                    color => color.name === list.color
                                  ).border
                                }
                              >
                                {list.title}

                                <SavedWordListItemRemoveIcon onClick={(e) => this.handleDeleteSavedWordList(e, word.title, list._id)} />
                              </SavedWordListItem>
                            );
                          })}
                        </div>
                      </SavedWordBoxBody>
                      <SavedWordBoxFooter>
                        <SavedWordBoxFooterIcon
                          icon="trash-alt"
                          title="Delete"
                          onClick={e => this.handleDeleteSavedWord(word._id)}
                        />
                        <Link
                          to={`/search?word=${word.title}`}
                          style={{ color: "black" }}
                        >
                          <SavedWordBoxFooterIcon
                            icon="external-link-square-alt"
                            title="Get definition"
                            style={{ transform: "translateY(8%)" }}
                          />
                        </Link>
                      </SavedWordBoxFooter>
                    </SavedWordBox>
                  );
                })}
              </Row>
            ))}
      </div>
    );
  }
}

export default Saved;
