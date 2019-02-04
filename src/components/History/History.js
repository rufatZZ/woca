import React, { Component } from "react";
import { Link } from "react-router-dom";

const HistoryList = ({ wordList }) => {
  let count = 0;
  wordList.sort(function(a, b) {
    return Date.parse(b.time) - Date.parse(a.time);
  });
  return wordList.map(word => {
    count++;
    return (
      <tr key={Math.random() * Date.parse(word.time)}>
        <th scope="row">{count}</th>
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
  }

  componentWillMount() {
    let historyWordList = JSON.parse(
      localStorage.getItem("wordHistory") || "[]"
    );
    this.setState({ historyList: historyWordList });
  }

  render() {
    let { historyList } = this.state;
    return (
      <div>
        <div className="row">
          <h2>
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
