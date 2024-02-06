import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './moviesSlice';
import starredSlice from './starredSlice';
import watchLaterSlice from './watchLaterSlice';
import { movieApi } from '../services/movieApi';

const store = configureStore({
	reducer: {
		movies: moviesSlice.reducer,
		starred: starredSlice.reducer,
		watchLater: watchLaterSlice.reducer,
		[movieApi.reducerPath]: movieApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(movieApi.middleware),
});

export default store;
