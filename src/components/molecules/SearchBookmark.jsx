import React, { Component } from "react";

class SearchBookmark extends Component {
  render() {
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Insert a search term"
          aria-label="Insert a search term"
          aria-describedby="button-addon2"
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" id="button-addon2">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBookmark;
