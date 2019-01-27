import React, { Component } from "react";

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
            return(
                <div key={word}><a href={`?entry=${word}`}>{word}</a></div>
            )
        } else {
          return (
            <div className="card" key={uuid} style={{ marginBottom: "5px" }}>
              <div className="card-body" style={{ padding: 0 }}>
                <div className="alert alert-light">
                  <div>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        textTransform: "lowercase"
                      }}
                    >
                      <sup>{count}</sup>
                      {entry}
                    </span>
                    - <em>{fl}</em>
                  </div>
                  <div>
                    <p>
                      {hw} | {mw}
                    </p>
                  </div>
                </div>
                <div className="alert alert-secondary">
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    <ShordefList shortdef={shortdef} />
                  </ul>
                </div>
              </div>
            </div>
          );
        }
      });
    } else {
      return [];
    }
  }
}

export default WordList;
