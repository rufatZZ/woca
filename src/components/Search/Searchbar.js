import React, { Component } from "react";

export class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleClear() {
    this.setState({ inputValue: "" });
  }

  handleClick() {
    let entry = this.state.inputValue;
    this.props.onSearchEntry(entry);
  }

  render() {
    let { inputValue } = this.state;
    return (
      <div className="row">
        <div className="col-md-10 col-sm-10">
          <div className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Enter the word"
              value={inputValue}
              onChange={this.handleChange}
            />
            <span
              onClick={this.handleClear}
              style={{
                zIndex: "9",
                top: "50%",
                position: "absolute",
                right: "1rem",
                transform: "translate(-1rem, -80%)",
                fontSize: "20px",
                cursor: "pointer",
                opacity: "0.6"
              }}
            >
              <i className="fas fa-times" />
            </span>
          </div>
        </div>
        <div className="col-md-2 col-sm-2">
          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={this.handleClick}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Searchbar;
