import React, { Component } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getAllHistory } from "../../actions/actions";

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
  border-radius: 1rem;
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
class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      historyList: []
    };

    this.handleFlush = this.handleFlush.bind(this);
    this.getHistory = this.getHistory.bind(this);
  }

  componentWillMount() {
    this.getHistory();
  }

  getHistory() {
    let historyWordList = getAllHistory();
    this.setState({ historyList: historyWordList });
  }

  handleFlush() {
    sessionStorage.removeItem("wordHistory");
    this.getHistory();
  }

  render() {
    let { historyList } = this.state;
    return (
      <div>
        <SavedFlex>
          <SavedTitle>
            <button
              className="btn btn-danger mr-3 mb-1"
              onClick={this.handleFlush}
            >
              <i className="fa fa-trash" /> Flush
            </button>
            History <small>(*session based history)</small>
          </SavedTitle>
        </SavedFlex>
        <br />
        <SavedFlex>
          {historyList.map(word => {
            return (
              <SavedWordBox key={Math.random() * Date.parse(word.time)}>
                <SavedWordBoxBody>
                  <SavedWordBoxTitle>{word.value}</SavedWordBoxTitle>
                </SavedWordBoxBody>
                <SavedWordBoxFooter>
                  <SavedWordBoxFooterIcon
                    icon="trash-alt"
                    title="Delete"
                    // onClick={e => this.handleDeleteSavedWord(word._id)}
                  />
                  <Link
                    to={`/search?word=${word.value}`}
                    style={{ color: "black" }}
                  >
                    <SavedWordBoxFooterIcon
                      icon="external-link-square-alt"
                      title="Get definition"
                      style={{ transform: "translateY(8%)" }}
                    />
                  </Link>
                  {word.time}
                </SavedWordBoxFooter>
              </SavedWordBox>
            );
          })}
        </SavedFlex>
      </div>
    );
  }
}

export default History;
