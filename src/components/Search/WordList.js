import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  handleAudio(e) {
    const parent = Array.from(e.currentTarget.children);
    let sound = parent.find(item => {
      return item.tagName === "AUDIO";
    });
    sound.play();
  }

  render() {
    const { wordList, entry } = this.props;
    let count = 0;

    if (wordList.length > 0) {
      return wordList.map(word => {
        let { uuid = "" } = word.meta || {};
        let { hw = "", prs = {} } = word.hwi || {};
        let { mw = "" } = prs[0] || {};
        let { fl = "", shortdef = [] } = word;

        let soundPath;
        if(prs[0] && prs[0].sound !== undefined){
          if (prs[0].sound.audio.substr(0, 2) === "bix") {
            soundPath = "bix";
          } else if (prs[0].sound.audio.substr(0, 1) === "gg") {
            soundPath = "gg";
          } else if (!isNaN(prs[0].sound.audio[0])) {
            soundPath = "number";
          } else {
            soundPath = prs[0].sound.audio[0];
          }
        }
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
                      {prs[0] && prs[0].sound !== undefined && (
                        <button
                          className="ml-2 mb-1 btn btn-sm btn-secondary"
                          onClick={e => this.handleAudio(e)}
                        >
                          <FontAwesomeIcon icon="volume-up"/>
                          <audio
                            src={`https://media.merriam-webster.com/soundc11/${soundPath}/${
                              prs[0].sound.audio
                            }.wav`}
                          />
                        </button>
                      )}
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
