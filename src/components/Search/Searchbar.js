import React, { Component } from "react";
import styled from "styled-components";

const InputResetIcon = styled.span`
  z-index: 9;
  top: 50%;
  position: absolute;
  right: 1rem;
  transform: translate(-1rem, -80%);
  font-size: 20px;
  cursor: pointer;
  opacity: 0.6;

  ${({ inputValue }) =>
    !inputValue &&
    ` display: none;
`}
`;

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
        <div className="col-md-9 col-sm-9">
          <div className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              id="entryInput"
              placeholder="Enter the word"
              value={inputValue}
              onChange={this.handleChange}
              autoComplete="off"
              onKeyPress={e => e.key === 'Enter' ? this.handleClick() : '' }
            />
            <InputResetIcon onClick={this.handleClear} inputValue={inputValue}>
              <i className="fas fa-times" />
            </InputResetIcon>
          </div>
        </div>
        <div className="col-md-3 col-sm-3">
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
