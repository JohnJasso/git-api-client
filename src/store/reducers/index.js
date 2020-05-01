import { combineReducers } from "redux";
import bookmarksReducer from "./bookmarksReducer";

export default combineReducers({
  bookmarks: bookmarksReducer,
});
