import React, { Component } from "react";
import PropTypes from "prop-types";
import BookmarksList from "../organisms/BookmarksList";
import NavBar from "../atoms/NavBar";
import SearchBookmark from "../molecules/SearchBookmark";
import { connect } from "react-redux";
import { fetchBookmarks, searchRepos } from "../../store/actions";

class Default extends Component {
  state = {
    title: "Github Bookmarking Application",
    baseURL: "http://localhost:3000",
    reposSearched: [],
    errorMessage: null,
  };

  constructor() {
    super();
    console.log("Default - Constructor");
  }

  async componentDidMount() {
    console.log("Default - Component Mounted");
    this.props.fetchBookmarks();
  }

  componentDidUpdate() {
    console.log("App - Updated");
  }

  render() {
    console.log("App - Rendered");

    return (
      <React.Fragment>
        <NavBar
          title={this.state.title}
          totalBookmarks={this.props.bookmarks.length}
        ></NavBar>
        <main className="container mt-5">
          <div className="d-flex flex-wrap justify-content-between">
            <div className="mb-3" style={{ maxWidth: 700 }}>
              <h5 className="mb-3">
                Search for repositories to bookmark: <br />
                <small className="text-muted">
                  Separate keywords and define topics and languages in the
                  following way:
                  <i>tetris+language:c+topic:game</i>
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
            <div>
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

  //   getBookmarks = async () => {
  //     const url = new URL(`${this.state.baseURL}/api/bookmarks`);
  //     try {
  //       const response = await fetch(url);
  //       const json = await response.json();
  //       await this.setState({ bookmarksSaved: json });
  //     } catch (error) {
  //       console.log("Server error: ", error);
  //       this.setState({ errorMessage: error });
  //     }
  //   };
  handleSearch = async (term) => {
    this.props.searchRepos(term);
  };
  handleBookmark = async (id) => {
    console.log("Bookmark", id);
    const url = new URL(`${this.state.baseURL}/api/bookmark-repo/${id}`);
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Length": 0,
        },
      });
      const json = await response.json();
      if (json.message === "Bookmarked repository") {
        await this.getBookmarks();
      }
    } catch (error) {
      console.log("Server error: ", error);
      this.setState({ errorMessage: error });
    }
  };
  handleDelete = async (id) => {
    console.log("Delete", id);
    const url = new URL(`${this.state.baseURL}/api/bookmark-repo/${id}`);
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Length": 0,
        },
      });
      const json = await response.json();
      if (json.message === "Removed bookmark") {
        await this.getBookmarks();
      }
    } catch (error) {
      console.log("Server error: ", error);
      this.setState({ errorMessage: error });
    }
  };
}

Default.propTypes = {
  fetchBookmarks: PropTypes.func.isRequired,
  bookmarks: PropTypes.array.isRequired,
  searchRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  bookmarks: state.bookmarks.items,
  repos: state.bookmarks.repos,
});

export default connect(mapStateToProps, { fetchBookmarks, searchRepos })(
  Default
);
