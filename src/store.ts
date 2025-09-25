// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./slices/quizSlice"
import authReducer from "./slices/authSlice"

export const store = configureStore({
    reducer: {
        quiz: quizReducer,
        auth: authReducer
    },
    devTools: true
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;