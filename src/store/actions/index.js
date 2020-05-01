import {
  FETCH_BOOKMARKS,
  FETCH_REPOS,
  NEW_BOOKMARK,
  DELETE_BOOKMARK,
  UPDATE_ERROR,
} from "./types";

const baseURL = "http://localhost:3000";

export const fetchBookmarks = () => async (dispatch) => {
  const url = new URL(`${baseURL}/api/bookmarks`);
  try {
    const response = await fetch(url);
    const json = await response.json();
    await dispatch({
      type: FETCH_BOOKMARKS,
      payload: json,
    });
  } catch (error) {
    console.log("Server error: ", error);
    await dispatch({
      type: UPDATE_ERROR,
      payload: error,
    });
  }
};

export const searchRepos = (term) => async (dispatch) => {
  const url = new URL(`${baseURL}/api/search-repo?term=${term}`);
  try {
    const response = await fetch(url);
    const json = await response.json();
    await dispatch({
      type: FETCH_REPOS,
      payload: json.items,
    });
  } catch (error) {
    console.log("Server error: ", error);
    await dispatch({
      type: UPDATE_ERROR,
      payload: error,
    });
  }
};

export const addBookmark = (id) => async (dispatch) => {
  const url = new URL(`${baseURL}/api/bookmark-repo/${id}`);
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Length": 0,
      },
    });
    const json = await response.json();
    if (json.message === "Bookmarked repository") {
      await dispatch({
        type: NEW_BOOKMARK,
        payload: json,
      });
    }
  } catch (error) {
    console.log("Server error: ", error);
    await dispatch({
      type: UPDATE_ERROR,
      payload: error,
    });
  }
};
