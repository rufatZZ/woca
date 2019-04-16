import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getAllSavedWords, deleteSavedWord } from "../actions/actions";

import FlashMessages from "./_common/FlashMessages/FlashMessages";
import Loading from "./_common/Loading/Loading";

import WAlert from '../toolbox/components/Alert';

const SavedTitle = styled.h1`
  font-family: "MS-Bold";
  font-size: 2.5rem;
`;

const SavedFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SavedWordBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 200px;
  padding: 20px;
  margin: 0px 25px 30px 0px;
  border-radius: .35rem;
  box-sizing: border-box;
  box-shadow: -10px 10px 20px 0px rgb(222, 221, 221);
  transition: all 0.2s ease-in-out;
  &:hover {
    ${"" /* cursor: pointer; */}
    box-shadow: -10px 10px 20px 0px #994ed361;
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
        <SavedFlex>
          <SavedTitle>Saved</SavedTitle>
        </SavedFlex>
        <br />
        {isLoading && <Loading />}

        {connectionError && (
          <div className="row">
            <div className="col-md-12">
              <WAlert bg="danger">
                <h3 className="text-center">
                  Can't connect to server
                </h3>
              </WAlert>
            </div>
          </div>
        )}

        {!isLoading &&
          !connectionError &&
          (isEmpty ? (
            <div className="row">
              <div className="col-md-12">
                <WAlert bg="warning">
                  <h3 className="text-center">
                    Saved list is empty
                  </h3>
                </WAlert>
              </div>
            </div>
          ) : (
              <SavedFlex>
                {savedList.map(word => {
                  return (
                    <SavedWordBox key={word._id}>
                      <SavedWordBoxBody>
                        <SavedWordBoxTitle>{word.title}</SavedWordBoxTitle>
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
              </SavedFlex>
            ))}
      </div>
    );
  }
}

export default Saved;
