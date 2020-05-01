import React, { Component } from "react";

class SearchBookmark extends Component {
  state = {
    searchTerm: "",
  };
  render() {
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          name="search"
          className="form-control"
          placeholder="Insert a search term"
          aria-label="Insert a search term"
          onChange={this.onSearchTerm}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            disabled={this.state.searchTerm === ""}
            type="button"
            id="button-addon2"
            onClick={this.sendTerm}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    );
  }
  onSearchTerm = (e) => {
    this.setState({ searchTerm: e.target.value });
  };
  sendTerm = () => {
    this.props.onSearchBookMark(this.state.searchTerm);
  };
}

export default SearchBookmark;
