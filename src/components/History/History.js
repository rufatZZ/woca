import React, { Component } from "react";
import { Link } from "react-router-dom";

const HistoryList = ({ wordList }) => {
  wordList.sort(function(a, b) {
    return Date.parse(b.time) - Date.parse(a.time);
  });
  return wordList.map(word => {
    return (
      <tr key={Math.random() * Date.parse(word.time)}>
        <td>{word.time}</td>
        <td>{word.value}</td>
        <td width="20%">
          <Link
            to={`/search?word=${word.value}`}
            className="btn btn-outline-info"
          >
            Get definition
          </Link>
        </td>
        <td width="5%">
          <button className="btn btn-outline-danger">Delete</button>
        </td>
      </tr>
    );
  });
};

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
    let historyWordList = JSON.parse(
      sessionStorage.getItem("wordHistory") || "[]"
    );
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
        <div className="row">
          <h2>
            <button
              className="btn btn-danger mr-3 mb-1"
              onClick={this.handleFlush}
            >
              <i className="fa fa-trash" /> Flush
            </button>
            History <small>(*session based history)</small>
          </h2>
        </div>
        <br />
        <div className="row">
          <table className="table table-hover table-borderless">
            <tbody>
              <HistoryList wordList={historyList} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default History;
