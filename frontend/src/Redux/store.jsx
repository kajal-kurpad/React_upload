import { configureStore } from '@reduxjs/toolkit';
import combineReducers from './reducers';
import { thunk } from 'redux-thunk';

const store = configureStore({
    reducer: combineReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;