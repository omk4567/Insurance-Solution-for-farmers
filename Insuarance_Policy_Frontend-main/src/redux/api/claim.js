/*import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ 
  baseUrl: `${import.meta.env.VITE_SERVER}/api`, // Adjust based on your server's URL
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token'); // Get JWT token from localStorage
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

// Create the API slice
const claimApi = createApi({
  reducerPath: 'claimApi',
  baseQuery,
  endpoints: (builder) => ({
    // Mutation to submit a new claim
    submitClaim: builder.mutation({
      query: (formData) => ({
        url: '/claims', // The endpoint to hit
        method: 'POST',
        body: formData,
      }),
    }),
    
    // Query to get the current user's claims
    getMyClaims: builder.query({
      query: () => ({
        url: "/my-claims", 
        credentials:"include"
      }),
    }),
  }),
});

// Export the auto-generated hooks for the queries and mutations
export const { useSubmitClaimMutation, useGetMyClaimsQuery } = claimApi;

// Export the API slice reducer to be added to the store 

export default claimApi;  till user part of claims*/ 

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query setup with JWT token in headers
const baseQuery = fetchBaseQuery({ 
  baseUrl: `${import.meta.env.VITE_SERVER}/api`, // Adjust based on your server's URL
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token'); // Get JWT token from localStorage
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

// Create the API slice for claims
const claimApi = createApi({
  reducerPath: 'claimApi',
  baseQuery,
  tagTypes: ['Claim'], // Add tagTypes for cache management
  endpoints: (builder) => ({
    // Mutation to submit a new claim
    submitClaim: builder.mutation({
      query: (formData) => ({
        url: '/claims', // The endpoint to hit
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Claim'] // Invalidate cache on successful submission
    }),
    
    // Query to get the current user's claims
    getMyClaims: builder.query({
      query: () => ({
        url: "/my-claims", 
        credentials: "include"
      }),
      providesTags: ['Claim'], // Provides the Claim tag for cache management
    }),

    // Query to get all claims for the admin
    getAllClaimsForAdmin: builder.query({
      query: () => ({
        url: "/admin/claims/view", // API endpoint for admin to view all claims
        credentials: "include" // Include credentials for secure requests
      }),
      providesTags: ['Claim'] // Provides the Claim tag for cache management
    }), 

    // Mutation to process a claim (approve/deny/review) 
    processClaim: builder.mutation({
      query: ({ id, process }) => ({
        url: `/admin/claims/${id}`, // API endpoint to process the claim
        method: 'POST',
        body: { status: process }, // Send the new status (approved/review/denied) 
        credentials: "include" 
      }),
      invalidatesTags: ['Claim'], // Invalidate cache after processing claim
    }),   

    // Notification-related queries and mutations
    getNotifications: builder.query({
      query: () => ({
        url: `/notifications`,
        credentials: "include",
      }),
      providesTags: ["Notification"],  // Add Notification tag to handle caching or re-fetching
    }),       

    markAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}/read`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["Notification"],  // Invalidate Notification tag to refetch notifications when marked as read
    }),  
  }),
});

// Export the auto-generated hooks for the queries and mutations
export const { 
  useSubmitClaimMutation, 
  useGetMyClaimsQuery, 
  useGetAllClaimsForAdminQuery, 
  useGetClaimDetailsQuery, // Hook to get claim details
  useProcessClaimMutation, // Hook to process a claim  
  useGetNotificationsQuery,  // Export the new hook for fetching notifications
  useMarkAsReadMutation,     // Export the new hook for marking notifications as read
} = claimApi;

// Export the API slice reducer to be added to the store
export default claimApi;



 




