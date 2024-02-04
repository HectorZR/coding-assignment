import { useSelector, useDispatch } from 'react-redux';
import watchLaterSlice from '../data/watchLaterSlice';
import Movie from '../components/Movie';
import '../styles/starred.scss';
import { SelectedMoviesLayout } from '../components/SelectedMoviesLayout';

const WatchLater = ({ viewTrailer }) => {
	const state = useSelector((state) => state);
	const { watchLater } = state;
	const { remveAllWatchLater } = watchLaterSlice.actions;
	const dispatch = useDispatch();

	return (
		<SelectedMoviesLayout
			title="Watch Later List"
			emptyListMessage="You have no movies saved to watch later."
			removeAllTitle="Empty list"
			rootTestid="watch-later"
			movieListTestid="watch-later-movies"
			movies={watchLater.watchLaterMovies}
			onRemoveAll={() => dispatch(remveAllWatchLater())}
			renderDetailComponent={(movie) => (
				<Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
			)}
		/>
	);
};

export default WatchLater;
