/* import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const userApi=createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/user/`
    }),
    tagTypes:['User'],
    endpoints:(builder)=>({
        
        getMyProfile:builder.query({
            query:()=>({
                url:"my",
                credentials:"include"
            }),
            providesTags:["User"]
        }),


        createUser:builder.mutation({
            query:(data)=>({
                url:`new`,
                method:"POST",
                body:data,
                credentials:"include"
            }),
            invalidatesTags:["User"]
        }),
        login:builder.mutation({
            query:(data)=>({
                url:`login`,
                method:"POST",
                body:data,
                credentials:"include"
            })
        }),
        logout:builder.mutation({
            query:(data)=>({
                url:`logout`,
                method:"POST",
                credentials:"include"
            })
        }),
        updateProfile:builder.mutation({
            query:(data)=>({
                url:`profile/update`,
                method:"PUT",
                body:data,
                credentials:"include"
            }),
            invalidatesTags:["User"]
        }),

        createPolicy:builder.mutation({
            query:(data)=>({
                url:`profile/update`,
                method:"PUT",
                body:data,
                credentials:"include"
            }),
            invalidatesTags:["User"]
        }),
    })
})

export const {
    useGetMyProfileQuery,
    useCreateUserMutation,
    useLoginMutation,
    useUpdateProfileMutation,
    useLogoutMutation
}=userApi
export default userApi */ 

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,   
  }),
  tagTypes: ['User', 'Notification'],  // Add 'Notification' tag for notifications-related endpoints
  endpoints: (builder) => ({

    // User-related queries and mutations
    getMyProfile: builder.query({
      query: () => ({
        url: "my",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    createUser: builder.mutation({
      query: (data) => ({
        url: `new`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    login: builder.mutation({
      query: (data) => ({
        url: `login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `logout`,
        method: "POST",
        credentials: "include",
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `profile/update`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    createPolicy: builder.mutation({
      query: (data) => ({
        url: `profile/update`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

  }),
});

export const {
  useGetMyProfileQuery,
  useCreateUserMutation,
  useLoginMutation,
  useUpdateProfileMutation,
  useLogoutMutation,
} = userApi;

export default userApi;

