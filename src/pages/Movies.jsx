import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../constants';
import Movie from '../components/Movie';
import { Loader } from '../components/Loader';
import '../styles/movies.scss';
import { useQueryParam } from '../hooks/useQueryParam';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { fetchMovies } from '../data/moviesSlice';

const Movies = () => {
	const dispatch = useDispatch();
	const { movies, nextPage, fetchStatus } = useSelector(
		(state) => state.movies
	);
	const searchQuery = useQueryParam('search');

	// I'm adding useEffect and useInfiniteScroll hooks here
	// to restart pagination when the search query changes,
	// because every time the search input is clicked, the component is mounted again.
	useEffect(() => {
		const url = searchQuery
			? `${ENDPOINT_SEARCH}&query=${searchQuery}`
			: ENDPOINT_DISCOVER;

		dispatch(fetchMovies(url));
	}, [searchQuery, dispatch]);

	useInfiniteScroll({
		onReachedEnd: () => {
			const url = searchQuery
				? `${ENDPOINT_SEARCH}&query=${searchQuery}&page=${nextPage}`
				: `${ENDPOINT_DISCOVER}&page=${nextPage}`;

			dispatch(fetchMovies(url));
		},
	});

	return (
		<div data-testid="movies">
			<div className="movie-list">
				{movies.map((movie) => {
					return <Movie movie={movie} key={movie.id} />;
				})}
			</div>

			{fetchStatus === 'loading' && <Loader />}
		</div>
	);
};

export default Movies;
