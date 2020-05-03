import React, { Component } from "react";
import PropTypes from "prop-types";
import BookmarksList from "../organisms/BookmarksList";
import NavBar from "../atoms/NavBar";
import SearchBookmark from "../molecules/SearchBookmark";
import { connect } from "react-redux";
import {
  fetchBookmarks,
  searchRepos,
  addBookmark,
  deleteBookmark,
} from "../../store/actions";

class Default extends Component {
  state = {
    title: "Github Bookmarking Application",
  };

  async componentDidMount() {
    this.props.fetchBookmarks();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.bookmarks && (
          <NavBar
            title={this.state.title}
            totalBookmarks={this.props.bookmarks.length}
          ></NavBar>
        )}
        {!this.props.bookmarks && <NavBar title={this.state.title}></NavBar>}
        <main className="container mt-5">
          <div className="d-flex flex-wrap justify-content-between">
            <div className="mb-3" style={{ maxWidth: 700 }}>
              {this.props.errorMessage && (
                <div class="alert alert-danger" role="alert">
                  {this.props.errorMessage}
                </div>
              )}
              <h5 className="mb-3">
                Search for repositories to bookmark: <br />
                <small className="text-muted text-justify">
                  Enter your keywords for repository search. <br />
                  You can define languages, topics and repository owner in the
                  following way:&nbsp;
                  <i>language:swift topic:game user:JohnSmith</i>. Each counts
                  as a keyword and you can separate keywords with a space or +
                  sign.
                </small>
              </h5>
              <SearchBookmark
                onSearchBookMark={this.handleSearch}
              ></SearchBookmark>
              <BookmarksList
                search={true}
                bookmarks={this.props.repos}
                onBookmark={this.handleBookmark}
              ></BookmarksList>
            </div>
            <div style={{ maxWidth: 380 }}>
              <h5 className="mb-3">Bookmarked repositories:</h5>
              <BookmarksList
                bookmarks={this.props.bookmarks}
                onDelete={this.handleDelete}
              ></BookmarksList>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }

  handleSearch = async (term) => {
    this.props.searchRepos(term);
  };
  handleBookmark = async (id) => {
    this.props.addBookmark(id);
  };
  handleDelete = async (id) => {
    this.props.deleteBookmark(id);
  };
}

Default.propTypes = {
  fetchBookmarks: PropTypes.func.isRequired,
  bookmarks: PropTypes.array.isRequired,
  searchRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  addBookmark: PropTypes.func,
  deleteBookmark: PropTypes.func,
};

const mapStateToProps = (state) => ({
  bookmarks: state.bookmarks.items,
  repos: state.bookmarks.repos,
  errorMessage: state.bookmarks.errorMessage,
});

export default connect(mapStateToProps, {
  fetchBookmarks,
  searchRepos,
  addBookmark,
  deleteBookmark,
})(Default);
