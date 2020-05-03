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
    loadingInit: null,
    loadingSearch: null,
    addingBookmark: false,
  };

  async componentDidMount() {
    this.setState({ loadingInit: true });
    await this.props.fetchBookmarks();
    this.setState({ loadingInit: false });
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
                <small className="text-muted">
                  You can define languages and topics in the following
                  way:&nbsp;
                  <i>language:swift topic:game</i>. Each counts as a keyword and
                  you can separate keywords with a space or + sign.
                </small>
              </h5>
              <SearchBookmark
                onSearchBookMark={this.handleSearch}
              ></SearchBookmark>
              <BookmarksList
                search={true}
                loading={this.state.loadingSearch}
                bookmarks={this.props.repos}
                onBookmark={this.handleBookmark}
              ></BookmarksList>
            </div>
            <div style={{ maxWidth: 380 }}>
              <h5 className="mb-3">Bookmarked repositories:</h5>
              <BookmarksList
                loading={this.state.loadingInit}
                adding={this.state.addingBookmark}
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
    this.setState({ loadingSearch: true });
    await this.props.searchRepos(term);
    this.setState({ loadingSearch: false });
  };
  handleBookmark = async (id) => {
    this.setState({ addingBookmark: true });
    await this.props.addBookmark(id);
    this.setState({ addingBookmark: false });
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
