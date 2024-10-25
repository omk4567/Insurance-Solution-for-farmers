/*import { configureStore } from "@reduxjs/toolkit";
import userApi from "./api/user";
import policyApi from "./api/policy";
import userReducer from "./reducers/userReducer";
import applicationApi from "./api/application";
import claimApi from "./api/claim"; // Import claimApi

const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [policyApi.reducerPath]: policyApi.reducer,
        [applicationApi.reducerPath]: applicationApi.reducer,
        [claimApi.reducerPath]: claimApi.reducer, // Add claimApi reducer
        [userReducer.name]: userReducer.reducer,
    },
    middleware: (mid) => [
        ...mid(),
        userApi.middleware,
        policyApi.middleware,
        applicationApi.middleware,
        claimApi.middleware, // Add claimApi middleware
    ],
});

export default store;   till user part of claims*/ 
import { configureStore } from "@reduxjs/toolkit";
import userApi from "./api/user";
import policyApi from "./api/policy";
import userReducer from "./reducers/userReducer";
import applicationApi from "./api/application";
import claimApi from "./api/claim"; // Import claimApi

const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [policyApi.reducerPath]: policyApi.reducer,
        [applicationApi.reducerPath]: applicationApi.reducer,
        [claimApi.reducerPath]: claimApi.reducer, // Add claimApi reducer
        [userReducer.name]: userReducer.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
        .concat(
            userApi.middleware,
            policyApi.middleware,
            applicationApi.middleware,
            claimApi.middleware // Add claimApi middleware
        ),
});

export default store;


  