import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
	const response = await fetch(apiUrl);
	return response.json();
});

const moviesSlice = createSlice({
	name: 'movies',
	initialState: {
		results: [],
		page: 1,
		totalPages: 0,
		totalResults: 0,
		fetchStatus: '',
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovies.fulfilled, (state, action) => {
				state.results = action.payload.results;
				state.page = action.payload.page;
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
