import {
  FETCH_BOOKMARKS,
  FETCH_REPOS,
  NEW_BOOKMARK,
  DELETE_BOOKMARK,
  UPDATE_ERROR,
} from "../actions/types";

const initialState = {
  repos: [],
  items: [],
  errorMessage: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOKMARKS:
      return {
        ...state,
        items: action.payload,
      };
    case FETCH_REPOS:
      return {
        ...state,
        repos: action.payload,
      };
    case NEW_BOOKMARK:
      return {
        ...state,
        items: action.payload,
      };
    case DELETE_BOOKMARK:
      return {
        ...state,
        items: action.payload,
      };
    case UPDATE_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
