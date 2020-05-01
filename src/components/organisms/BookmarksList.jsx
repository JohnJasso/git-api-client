import React, { Component } from "react";
import StarButton from "../atoms/StarButton";
import DeleteButton from "../atoms/DeleteButton";

class App extends Component {
  render() {
    console.log("List - Rendered");

    return (
      <div className="list-group">
        {this.props.bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="list-group-item d-flex justify-content-between"
          >
            <div>
              <div className="d-flex">
                <h5 className="mr-5 list__repo-title">{bookmark.name}</h5>
                {this.props.search && (
                  <span className="list__repo-title">
                    <i className="fas fa-user mr-2"></i>
                    {bookmark.full_name.split("/")[0]}
                  </span>
                )}
                {this.props.search && (
                  <span
                    className="badge badge-pill badge-secondary pb-0"
                    style={{ height: 20 }}
                  >
                    <i className="fas fa-code mr-1 pa-0"></i>
                    {bookmark.language}
                  </span>
                )}
              </div>
              {this.props.search && (
                <div className="mb-1">
                  <span className="text-muted">{bookmark.description}</span>
                </div>
              )}
              {!this.props.search && (
                <div className="mb-1" style={{ maxWidth: 220 }}>
                  <span className="text-muted">{bookmark.description}</span>
                </div>
              )}
              <div className="d-flex" style={{ columnGap: 24 }}>
                <span>
                  <i className="fas fa-code-branch mr-1"></i>
                  {bookmark.forks_count}
                </span>
                <span>
                  <i className="fas fa-star mr-1"></i>
                  {bookmark.stargazers_count}
                </span>
                <span>
                  <i className="fas fa-eye mr-1"></i>
                  {bookmark.watchers}
                </span>
              </div>
            </div>
            {this.props.search && <StarButton></StarButton>}
            {!this.props.search && <DeleteButton></DeleteButton>}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
