import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_KEY, ENDPOINT } from '../constants';

export const movieApi = createApi({
	reducerPath: 'movieApi',
	baseQuery: fetchBaseQuery({ baseUrl: ENDPOINT }),
	endpoints: (builder) => ({
		getMovieTrailerById: builder.query({
			query: (id) =>
				`/movie/${id}?api_key=${API_KEY}&append_to_response=videos`,
			transformResponse: (response) => {
				if (!(response.videos && response.videos.results.length)) {
					return null;
				}

				const trailer = response.videos.results.find(
					(vid) => vid.type === 'Trailer'
				);

				return trailer ? trailer.key : response.videos.results[0].key;
			},
		}),
	}),
});

export const { useGetMovieTrailerByIdQuery } = movieApi;
