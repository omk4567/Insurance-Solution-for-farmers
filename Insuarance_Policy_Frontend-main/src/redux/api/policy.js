import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const policyApi=createApi({
    reducerPath:"policyApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/policy/`
    }),
    tagTypes:['Policy'],
    endpoints:(builder)=>({
        
        searchPolicies:builder.query({
            query:(search="")=>({
                url:`search?search=${search}`,
                credentials:"include"
            }),
            providesTags:["Policy"]
        }),


        
        createPolicy:builder.mutation({
            query:(data)=>({
                url:`create`,
                method:"POST",
                body:data,
                credentials:"include"
            }),
            invalidatesTags:["Policy"]
        }),
        deletePolicy:builder.mutation({
            query:(id)=>({
                url:`delete`,
                method:"DELETE",
                body:id,
                credentials:"include"
            }),
            invalidatesTags:["Policy"]
        }),
    })
})

export const {
    useSearchPoliciesQuery,
    useCreatePolicyMutation,
    useDeletePolicyMutation
}=policyApi
export default policyApi
