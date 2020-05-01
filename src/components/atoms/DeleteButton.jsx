import React, { Component } from "react";

class DeleteButton extends Component {
  render() {
    return (
      <button
        className="btn btn-outline-danger mt-auto mb-auto ml-5"
        style={{ borderRadius: "50%" }}
        onClick={this.sendDeleteId}
      >
        <i className="fas fa-trash-alt"></i>
      </button>
    );
  }
  sendDeleteId = () => {
    this.props.onBookmark(this.props.bookmarkId);
  };
}

export default DeleteButton;
