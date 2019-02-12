import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const EntrySpan = styled.span`
  font-size: 24px;
  font-weight: bold;
  text-transform: lowercase;
`;

const ShordefListHolder = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SuggestedWordLink = styled(Link)`
  margin-bottom: 5px !important;
  transition: 0.15s ease-in-out;
  &:hover {
    color: white;
    background-color: rgba(0, 123, 255, 0.9) !important;
  }
`;

const WordCard = styled.div`
  margin-bottom: 5px !important;
  .card-body {
    padding: 0;
  }
`;

const ShordefList = ({ shortdef }) => {
  return shortdef.map(sd => {
    return <li key={sd}>- {sd}</li>;
  });
};

class WordList extends Component {
  render() {
    const { wordList, entry } = this.props;
    let count = 0;

    if (wordList.length > 0) {
      return wordList.map(word => {
        let { uuid = "" } = word.meta || {};
        let { hw = "", prs = {} } = word.hwi || {};
        let { mw = "" } = prs[0] || {};
        let { fl = "", shortdef = [] } = word;
        count++;

        if (typeof word === "string") {
          return (
            <div key={word}>
              <SuggestedWordLink
                className="list-group-item"
                to={`/search?word=${word}`}
              >
                {word}
              </SuggestedWordLink>
            </div>
          );
        } else {
          return (
            <WordCard className="card" key={uuid}>
              <div className="card-body">
                <div className="alert alert-light">
                  <div>
                    <EntrySpan>
                      <sup>{count}</sup>
                      {entry}
                    </EntrySpan>
                  </div>
                  <div>
                    <p>
                      <em>{fl}</em> {mw ? `|` + mw : ""}
                    </p>
                  </div>
                </div>
                <div className="alert alert-secondary">
                  <ShordefListHolder>
                    <ShordefList shortdef={shortdef} />
                  </ShordefListHolder>
                </div>
              </div>
            </WordCard>
          );
        }
      });
    } else {
      return [];
    }
  }
}

export default WordList;
