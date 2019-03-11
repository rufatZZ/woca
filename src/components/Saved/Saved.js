import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAllSavedWords, deleteSavedWord } from "../../actions/actions";
import FlashMessages from "../_common/FlashMessages/FlashMessages";
import Loading from "../_common/Loading/Loading";

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
    let { savedList, message, isLoading, isEmpty, connectionError } = this.state;
    let count = 0;
    savedList.sort(function(a, b) {
      return Date.parse(b.time) - Date.parse(a.time);
    });

    return (
      <div>
        <FlashMessages message={message} />
        <div className="row">
          <h2>Saved word list</h2>
        </div>
        <br />
        {isLoading && <Loading />}
        {connectionError && (
          <div className="row">
            <div className="col-md-12">
              <h3 className="alert alert-danger text-center">
                Can't connect to server
              </h3>
            </div>
          </div>
        )}
        {!isLoading && !connectionError &&
          (isEmpty ? (
            <div className="row">
              <div className="col-md-12">
                <h3 className="alert alert-warning text-center">
                  Saved list is empty
                </h3>
              </div>
            </div>
          ) : (
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
          ))}
      </div>
    );
  }
}

export default Saved;
