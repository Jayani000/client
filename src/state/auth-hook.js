import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuth: false,
  savedItems: [],
  following: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.savedItems = action.payload.savedItems;
      state.following = action.payload.following;
      state.isAuth = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.savedItems = null;
      state.following = null;
      state.isAuth = false;
    },
    setSavedItems: (state, action) => {
      state.savedItems = action.payload.savedItems;
    },
    setFollowing: (state, action) => {
      state.following = action.payload.following;
    },
  },
});

export const { setLogin, setLogout, setSavedItems, setFollowing } = authSlice.actions;
export default authSlice.reducer;
