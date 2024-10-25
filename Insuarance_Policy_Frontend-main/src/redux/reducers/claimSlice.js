import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    claims: [], // To store a list of claims
    error: null, // To handle any error messages
};

const claimSlice = createSlice({
    name: "claim",
    initialState,
    reducers: {
        // Action to set loading state
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        // Action to add a new claim to the state
        addClaim: (state, action) => {
            state.claims.push(action.payload); // Add the new claim
        },
        // Action to handle errors
        setError: (state, action) => {
            state.error = action.payload; // Set the error message
        },
        // Action to clear error
        clearError: (state) => {
            state.error = null; // Reset the error message
        },
    },
});

// Export actions
export const { setLoading, addClaim, setError, clearError } = claimSlice.actions;

// Export the reducer
export default claimSlice.reducer;
