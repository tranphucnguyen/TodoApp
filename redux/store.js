// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { reducer as authReducer } from './authSlice';
import todoReducer from './todoSlice'; // Đảm bảo rằng bạn import đúng reducer

export const store = configureStore({
    reducer: {
        auth: authReducer,
        todos: todoReducer, // Gán reducer cho key 'todos'
    },
});
