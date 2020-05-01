import React from "react";
import "./App.css";
import Default from "./components/pages/Default";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Default></Default>
      </div>
    </Provider>
  );
}

export default App;
