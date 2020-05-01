import React, { Component } from "react";

class App extends Component {
  render() {
    console.log("List - Rendered");

    return (
      <div className="list-group">
        {this.props.bookmarks.map((bookmark) => (
          <div className="list-group-item">
            <div>
              <h5>{bookmark.name}</h5>
              <span>
                <b>Owner:</b>
                {bookmark.full_name.split("/")[0]}
              </span>
            </div>
            <h6>Language: {bookmark.language}</h6>
            <div>
              <p>Forks: {bookmark.forks_count}</p>
              <p>Bookmarks: {bookmark.stargazers_count}</p>
              <p>Watchers: {bookmark.watchers}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
