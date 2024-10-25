import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const applicationApi=createApi({
    reducerPath:"applicationApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/application/`
    }),
    tagTypes:['Application'],
    endpoints:(builder)=>({
        
        myApplications:builder.query({
            query:({status="",userId})=>({
                url:`my?status=${status}&userId=${userId}`,
                credentials:"include"
            }),
            providesTags:["Application"]
        }),
        allApplications:builder.query({
            query:({status=""})=>({
                url:`all?status=${status}`,
                credentials:"include"
            }),
            providesTags:["Application"]
        }),
        aplicationDetails:builder.query({
            query:(id)=>({
                url:`/${id}`,
                credentials:"include"
            }),
            providesTags:["Application"]
        }),

        
        newApplication:builder.mutation({
            query:(data)=>({
                url:`new`,
                method:"POST",
                body:data,
                credentials:"include"
            }),
            invalidatesTags:["Application"]
        }),
        processApplication:builder.mutation({
            query:(data)=>({
                url:`process`,
                method:"PUT",
                body:data,
                credentials:"include"
            }),
            invalidatesTags:["Application"]
        }),
    })
})

export const {
   useMyApplicationsQuery,
   useAllApplicationsQuery,
   useAplicationDetailsQuery,
   useProcessApplicationMutation,
   useNewApplicationMutation,

}=applicationApi
export default applicationApi
