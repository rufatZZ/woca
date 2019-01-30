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
          </div>
        </div>
        <div className="col-md-2 col-sm-2">
          <button className="btn btn-primary btn-lg btn-block" onClick={this.handleClick}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Searchbar;
