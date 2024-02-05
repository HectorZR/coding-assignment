import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
	const response = await fetch(apiUrl);
	return response.json();
});

const moviesSlice = createSlice({
	name: 'movies',
	initialState: {
		movies: [],
		totalPages: 0,
		totalResults: 0,
		fetchStatus: '',
		nextPage: 1,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovies.fulfilled, (state, action) => {
				if (action.payload.page === 1) {
					state.movies = action.payload.results;
				} else {
					// API is returning duplicate movies, since we have no access to the API
					// I'm filtering them out here manually. This is not ideal, but it's a
					// workaround, because that small problem is causing infinite scroll not working properly.
					const uniqueMovies = action.payload.results.filter(
						({ id }) => !state.movies.find(({ id: movieId }) => movieId === id)
					);

					state.movies.push(...uniqueMovies);
				}
				state.nextPage = action.payload.page + 1;
				state.totalPages = action.payload.total_pages;
				state.totalResults = action.payload.total_results;
				state.fetchStatus = 'success';
			})
			.addCase(fetchMovies.pending, (state) => {
				state.fetchStatus = 'loading';
			})
			.addCase(fetchMovies.rejected, (state) => {
				state.fetchStatus = 'error';
			});
	},
});

export default moviesSlice;
