import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getAllSavedWords, deleteSavedWord } from "../actions/actions";

import FlashMessages from "./_common/FlashMessages/FlashMessages";
import Loading from "./_common/Loading/Loading";

import { Row, Col, Alert, Title } from "../toolbox/components";
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

const SavedWordListItem = styled.span`
  font-size: 12px;
  display: inline-block;
  color: #5a5858;
  border-radius: 0.35rem;
  margin: 2px;
  padding: 3px;
  background-color: #${props => props.bgColor};
  border: 1px solid ${props => props.borderColor};
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
  }

  componentWillMount() {
    this.getAllSavedWords();
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

  async getAllSavedWords() {
    let savedList = await getAllSavedWords();
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

    savedList.sort(function(a, b) {
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
          <Title>Saved</Title>
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
                      <div style={{position: "absolute", bottom: "10%"}}>
                        {word.lists.map(list => {
                          return (
                            <SavedWordListItem
                              key={list._id}
                              bgColor={
                                listColors.find(
                                  color => color.name === list.color
                                ).value
                              }
                              borderColor={
                                listColors.find(
                                  color => color.name === list.color
                                ).border
                              }
                            >
                              {list.title}
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
