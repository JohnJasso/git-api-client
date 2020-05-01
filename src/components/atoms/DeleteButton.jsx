import React, { Component } from "react";

class DeleteButton extends Component {
  render() {
    return (
      <button
        className="btn btn-outline-danger mt-auto mb-auto ml-5"
        style={{ borderRadius: "50%" }}
        // style={{ borderRadius: "50%", height: 45 }}
      >
        <i className="fas fa-trash-alt"></i>
      </button>
    );
  }
}

export default DeleteButton;
