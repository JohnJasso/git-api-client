import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">
          {this.props.title}
          <span className="badge badge-pill badge-primary ml-2">
            {this.props.totalBookmarks}
          </span>
        </span>
      </nav>
    );
  }
}

export default NavBar;
