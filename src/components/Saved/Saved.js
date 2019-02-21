import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAllSavedWords, deleteSavedWord } from "../../actions/actions";

class Saved extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savedList: []
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
    }
  }

  async getAllSavedWords() {
    let savedList = await getAllSavedWords();
    this.setState({ savedList: savedList });
  }

  render() {
    let { savedList } = this.state;
    let count = 0;
    savedList.sort(function(a, b) {
      return Date.parse(b.time) - Date.parse(a.time);
    });

    return (
      <div>
        <div className="row">
          <h2>Saved word list</h2>
        </div>
        <br />
        <div className="row">
          <table className="table table-hover table-borderless">
            <tbody>
              {savedList.map(word => {
                count++;
                return (
                  <tr key={word._id}>
                    <th scope="row" width="5%">
                      {count}
                    </th>
                    <td width="80%">{word.title}</td>
                    <td width="20%">
                      <Link
                        to={`/search?word=${word.title}`}
                        className="btn btn-outline-info"
                      >
                        Get definition
                      </Link>
                    </td>
                    <td width="5%">
                      <button
                        className="btn btn-outline-danger"
                        onClick={e => this.handleDelete(word._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Saved;
