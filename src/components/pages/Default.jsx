import React, { Component } from "react";
import BookmarksList from "../organisms/BookmarksList";
import NavBar from "../atoms/NavBar";
import SearchBookmark from "../molecules/SearchBookmark";

class App extends Component {
  state = {
    title: "Git Bookmarking Application",
    baseURL: "http://localhost:3000",
    bookmarksSaved: [],
    bookmarksSearched: [],
    errorMessage: null,
    bookmarks: [
      {
        id: 1,
        name: "git-api-service",
        full_name: "JohnJasso/git-api-service",
        language: "Javascript",
        stargazers_count: "1",
        forks_count: "3",
        watchers: "5",
        description:
          "A repository used in testing dfasdf dfadfas dfasd dfadsf asdfa sdfasd",
      },
      {
        id: 2,
        name: "tetris",
        full_name: "user1/tetris",
        language: "Javascript",
        stargazers_count: "1",
        forks_count: "3",
        watchers: "5",
        description: "A repository used in testing",
      },
      {
        id: 3,
        name: "tic-tac-toe",
        full_name: "usuarioDoce/tic-tac-toe",
        language: "Python",
        stargazers_count: "1",
        forks_count: "3",
        watchers: "5",
        description: "A repository used in testing",
      },
    ],
  };

  constructor() {
    super();
    console.log("Default - Constructor");
  }

  async componentDidMount() {
    console.log("Default - Component Mounted");
    this.getBookmarks();
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
          totalBookmarks={this.state.bookmarks.length}
        ></NavBar>
        <main className="container mt-5">
          <div className="d-flex justify-content-between">
            <div style={{ maxWidth: 700 }}>
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
                bookmarks={this.state.bookmarksSearched}
                onBookmark={this.handleBookmark}
              ></BookmarksList>
            </div>
            <div>
              <h5 className="mb-3">Bookmarked repositories:</h5>
              <BookmarksList
                bookmarks={this.state.bookmarksSaved}
                onDelete={this.handleDelete}
              ></BookmarksList>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }

  getBookmarks = async () => {
    const url = new URL(`${this.state.baseURL}/api/bookmarks`);
    try {
      const response = await fetch(url);
      const json = await response.json();
      this.setState({ bookmarksSaved: json });
    } catch (error) {
      console.log("Server error: ", error);
      this.setState({ errorMessage: error });
    }
  };
  handleSearch = async (term) => {
    console.log("Term:", term);
    const url = new URL(`${this.state.baseURL}/api/search-repo?term=${term}`);
    try {
      const response = await fetch(url);
      const json = await response.json();
      this.setState({ bookmarksSearched: json.items });
    } catch (error) {
      console.log("Server error: ", error);
      this.setState({ errorMessage: error });
    }
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
        this.getBookmarks();
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
        this.getBookmarks();
      }
    } catch (error) {
      console.log("Server error: ", error);
      this.setState({ errorMessage: error });
    }
  };
}

export default App;
