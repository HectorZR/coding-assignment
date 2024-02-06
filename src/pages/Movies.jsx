import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../constants';
import Movie from '../components/Movie';
import { Loader } from '../components/Loader';
import '../styles/movies.scss';
import { useQueryParam } from '../hooks/useQueryParam';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { fetchMovies } from '../data/moviesSlice';

const MINIMUM_MOVIES_COUNT = 20;

const Movies = () => {
	const dispatch = useDispatch();
	const { movies, nextPage, fetchStatus } = useSelector(
		(state) => state.movies
	);
	const searchQuery = useQueryParam('search');
	const getMoreMovies = useCallback(() => {
		const url = searchQuery
			? `${ENDPOINT_SEARCH}&query=${searchQuery}&page=${nextPage}`
			: `${ENDPOINT_DISCOVER}&page=${nextPage}`;

		dispatch(fetchMovies(url));
	}, [searchQuery, nextPage, dispatch]);

	useEffect(
		function getInitialMovieList() {
			const url = searchQuery
				? `${ENDPOINT_SEARCH}&query=${searchQuery}`
				: ENDPOINT_DISCOVER;

			dispatch(fetchMovies(url));
		},
		[searchQuery, dispatch]
	);

	useEffect(
		function restartScroll() {
			window.scrollTo(0, 0);
		},
		[searchQuery]
	);

	const elementRef = useInfiniteScroll({
		onReachedEnd: getMoreMovies,
	});

	return (
		<div data-testid="movies">
			<div className="movie-list">
				{movies.map((movie) => {
					return <Movie movie={movie} key={movie.id} />;
				})}
			</div>

			{movies.length >= MINIMUM_MOVIES_COUNT && (
				<div className="loader-container" ref={elementRef}>
					{fetchStatus === 'loading' && <Loader />}
				</div>
			)}
		</div>
	);
};

export default Movies;
