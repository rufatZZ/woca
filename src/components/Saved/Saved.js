import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getAllSavedWords, deleteSavedWord } from "../../actions/actions";
import Alert from "../_common/Alert/Alert";

const AlertHolder = styled.div`
  width: 300px;
  height: 80px;
  z-index: 9;
  position: fixed;
  right: 30px;
  bottom: 40px;
  display: flex;
  flex-direction: column-reverse;
`;

class Saved extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savedList: [],
      messages: []
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
        messages: [
          ...this.state.messages,
          {
            type: "error",
            id: Math.random() * 12345,
            text: "Word deleted"
          }
        ]
      });
    } else {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            type: "alert",
            id: Math.random() * 12345,
            text: "Cant delete word"
          }
        ]
      });
    }
  }

  async getAllSavedWords() {
    let savedList = await getAllSavedWords();
    this.setState({ savedList: savedList });
  }

  render() {
    let { savedList, messages } = this.state;
    let count = 0;
    savedList.sort(function(a, b) {
      return Date.parse(b.time) - Date.parse(a.time);
    });

    return (
      <div>
        <AlertHolder>
          {messages.length > 0 &&
            messages.map(msg => <Alert key={msg.id} message={msg} />)}
        </AlertHolder>
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
                        onClick={e => this.handleDeleteSavedWord(word._id)}
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
