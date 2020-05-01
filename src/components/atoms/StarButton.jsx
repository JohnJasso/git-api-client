import React, { Component } from "react";

class StarButton extends Component {
  render() {
    return (
      <button
        className="btn btn-outline-warning mt-auto mb-auto ml-5"
        style={{ borderRadius: "50%" }}
        // style={{ borderRadius: "50%", height: 45 }}
      >
        <i className="fas fa-star"></i>
      </button>
    );
  }
}

export default StarButton;
