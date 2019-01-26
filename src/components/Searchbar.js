import React, { Component } from "react";

export class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleClick() {
    let entry = this.state.inputValue;
    this.props.onSearchEntry(entry);
  }

  render() {
    let { inputValue } = this.state;
    return (
      <div className="row mt-3">
        <div className="offset-md-3 col-md-5 offset-sm-1 col-sm-7">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Enter the word"
              value={inputValue}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="col-md-1 col-sm-1">
          <button className="btn btn-primary" onClick={this.handleClick}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Searchbar;
