import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";

export const customApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.accessToken;
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
    },
  }),
  reducerPath: "customApi",

  tagTypes: [
    "AllPosts",
    "Recipes",
    "RecipeById",
    "RecipesByUser",
    "UserById",
    "Followers",
    "Following",
    "PostsByUser",
    "SavedPosts",
    "AllComments",
  ],
  //extractRehydrationInfo(action, { reducerPath }) {
  //if (action.type === REHYDRATE) {
  //return action.payload[reducerPath];
  //}
  //},
  endpoints: (build) => ({
    getAllPosts: build.query({
      query: () => ({ url: "api/posts/getPosts", method: "GET" }),
      providesTags: ["AllPosts"],
    }),
    getRecipes: build.query({
      query: () => ({
        url: "api/recipes/getRecipes",
        method: "GET",
      }),
      providesTags: ["Recipes"],
    }),
    getRecipeById: build.query({
      query: ({ id }) => ({
        url: `api/recipes/${id}`,
        method: "GET",
      }),
      providesTags: ["RecipeById"],
    }),
    getRecipesByUser: build.query({
      query: ({ user }) => ({
        url: `api/recipes/getRecipesByUser/${user}`,
        method: "GET",
      }),
      providesTags: ["RecipesByUser"],
    }),
    getUserById: build.query({
      query: ({ user }) => ({
        url: `api/users/user/${user}`,
        method: "GET",
      }),
      providesTags: ["UserById"],
    }),
    getFollowers: build.query({
      query: ({ user }) => ({
        url: `api/users/${user}/followers`,
        method: "GET",
      }),
      providesTags: ["Followers"],
    }),
    getFollowing: build.query({
      query: ({ user }) => ({
        url: `api/users/${user}/following`,
        method: "GET",
      }),
      providesTags: ["Following"],
    }),
    getAllPostsByUser: build.query({
      query: ({ userId }) => ({
        url: `api/posts/getPostsByUser/${userId}`,
        method: "GET",
      }),
      providesTags: ["PostsByUser"],
    }),
    getSavedPosts: build.query({
      query: ({ user }) => ({
        url: `api/users/${user}/savedItems`,
        method: "GET",
      }),
      providesTags: ["SavedPosts"],
    }),
    getAllComments: build.query({
      query: () => "api/comments/readComments",
      providesTags: ["AllComments"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useGetRecipesByUserQuery,
  useGetUserByIdQuery,
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetAllPostsByUserQuery,
  useGetAllCommentsQuery,
  useGetSavedPostsQuery,
} = customApi;
