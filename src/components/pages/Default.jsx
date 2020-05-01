import React, { Component } from "react";
import BookmarksList from "../organisms/BookmarksList";
import NavBar from "../atoms/NavBar";

class App extends Component {
  state = {
    title: "Git Bookmarking Application",
    bookmarks: [
      {
        id: 1,
        name: "git-api-service",
        full_name: "JohnJasso/git-api-service",
        language: "Javascript",
        stargazers_count: "1",
        forks_count: "3",
        watchers: "5",
      },
      {
        id: 1,
        name: "tetris",
        full_name: "user1/tetris",
        language: "Javascript",
        stargazers_count: "1",
        forks_count: "3",
        watchers: "5",
      },
      {
        id: 1,
        name: "tic-tac-toe",
        full_name: "usuarioDoce/tic-tac-toe",
        language: "Python",
        stargazers_count: "1",
        forks_count: "3",
        watchers: "5",
      },
    ],
  };

  constructor() {
    super();
    console.log("App - Constructor");
  }

  componentDidMount() {
    console.log("App - Component Mounted");
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
        <main className="container">
          {/* <List
            counters={this.state.counters}
            onReset={this.handleReset}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
          ></List> */}
          <BookmarksList bookmarks={this.state.bookmarks}></BookmarksList>
        </main>
      </React.Fragment>
    );
  }

  handleDelete = (counterId) => {
    const arrCounters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ counters: arrCounters });
  };
  handleReset = () => {
    const arrCounters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters: arrCounters });
  };
  handleIncrement = (counter) => {
    const arrCounters = [...this.state.counters];
    const index = arrCounters.indexOf(counter);
    arrCounters[index] = { ...counter };
    arrCounters[index].value++;
    this.setState({ counters: arrCounters });
  };
  handleDecrement = (counter) => {
    const arrCounters = [...this.state.counters];
    const index = arrCounters.indexOf(counter);
    arrCounters[index] = { ...counter };
    if (arrCounters[index].value > 0) arrCounters[index].value--;
    this.setState({ counters: arrCounters });
  };
}

export default App;
