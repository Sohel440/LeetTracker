import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://leetcode-stats-api.herokuapp.com/",
  }),
  endpoints: (builder) => ({
    // get all the the post API call 
     getLeetCodeProfile: builder.query({
      query: (username) => `${username}`, // dynamically append username to base URL
    }),

  }),
});

export const { useGetLeetCodeProfileQuery } = postApi;