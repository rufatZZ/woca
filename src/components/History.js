import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Row, Button, Title } from "../toolbox/components";
import { getAllHistory } from "../actions/actions";

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
  ${'' /* box-shadow: -10px 10px 20px 0px rgb(222, 221, 221); */}
  transition: all 0.2s ease-in-out;
  &:hover {
    ${"" /* cursor: pointer; */}
    ${'' /* box-shadow: -10px 10px 20px 0px #994ed361; */}
    box-shadow: 0 3px 3px 0 rgba(60,64,67,0.302), 0 3px 3px 2px rgba(60,64,67,0.149);
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

  handleDeleteHistoryWord(e, time) {
    e.target.parentNode.parentNode.parentNode.style.display = "none";

    let history = JSON.parse(sessionStorage.getItem("wordHistory") || "[]");
    history = history.filter(obj => {
      return obj.time !== time;
    });
    sessionStorage.setItem("wordHistory", JSON.stringify(history));
  }

  handleFlush() {
    sessionStorage.removeItem("wordHistory");
    this.getHistory();
  }

  render() {
    let { historyList } = this.state;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Recently searched</title>
        </Helmet>
        <Row>
          <Title>
            <Button bg="danger" onClick={this.handleFlush}>
              <FontAwesomeIcon icon="trash" /> Flush
            </Button>
            History <small>(*session based history)</small>
          </Title>
        </Row>
        <br />
        <Row>
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
                    onClick={e => this.handleDeleteHistoryWord(e, word.time)}
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
                  <span style={{ float: "right" }}>{word.time}</span>
                </SavedWordBoxFooter>
              </SavedWordBox>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default History;
