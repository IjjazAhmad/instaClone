import { combineReducers, configureStore } from "@reduxjs/toolkit";

import postSlice from "./slices/postSlice";
import allUserPost from "./slices/allUserPost";
import usersData from "./slices/usersData";

const rootReducer = combineReducers({
    posts: postSlice,
    allPosts: allUserPost,
    usersData: usersData,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof Store.dispatch;
export const Store = configureStore({
    reducer: rootReducer,
});
