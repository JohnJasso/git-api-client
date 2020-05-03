import React, { Component } from "react";

class BookmarksList extends Component {
  render() {
    return <div className="list-group">{this.renderList()}</div>;
  }
  sendBookmarkId = (id) => {
    this.props.onBookmark(id);
  };
  sendDeleteId = (id) => {
    this.props.onDelete(id);
  };
  renderList = () => {
    if (
      this.props.bookmarks &&
      this.props.bookmarks.length > 0 &&
      this.props.loading === false
    ) {
      return this.props.bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="list-group-item d-flex justify-content-between"
        >
          <div>
            <div className="d-flex">
              <h5 className="mr-5 list__repo-title">
                <a href={bookmark.html_url} target="_blank">
                  {bookmark.name}
                </a>
              </h5>
              {this.props.search && (
                <span className="list__repo-title mr-2">
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
              <div className="mb-1" style={{ maxWidth: 400 }}>
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
          {this.props.search && (
            <button
              className="btn btn-outline-warning mt-auto mb-auto ml-5"
              style={{ borderRadius: "50%" }}
              onClick={() => this.sendBookmarkId(bookmark.id)}
            >
              <i className="fas fa-star"></i>
            </button>
          )}
          {!this.props.search && (
            <button
              className="btn btn-outline-danger mt-auto mb-auto ml-5"
              style={{ borderRadius: "50%" }}
              onClick={() => this.sendDeleteId(bookmark.id)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          )}
        </div>
      ));
    } else if (this.props.loading === true && !this.props.search) {
      return (
        <div
          className="list-group-item d-flex justify-content-center"
          style={{ minWidth: 350 }}
        >
          <div className="spinner-border text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else if (this.props.loading === true && this.props.search === true) {
      return (
        <div
          className="list-group-item d-flex justify-content-center"
          // style={{ minWidth: 350 }}
        >
          <div className="spinner-border text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="list-group-item d-flex justify-content-center">
          <h6 className="mb-0 text-muted">
            <i className="fas fa-inbox mr-2"></i>There are no bookmarks to show
          </h6>
        </div>
      );
    }
  };
}

export default BookmarksList;
