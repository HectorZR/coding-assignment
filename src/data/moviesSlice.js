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
					state.movies.push(...action.payload.results);
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
