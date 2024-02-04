import { useSelector, useDispatch } from 'react-redux';
import starredSlice from '../data/starredSlice';
import Movie from '../components/Movie';
import '../styles/starred.scss';
import { SelectedMoviesLayout } from '../components/SelectedMoviesLayout';

const Starred = ({ viewTrailer }) => {
	const state = useSelector((state) => state);
	const { starred } = state;
	const { clearAllStarred } = starredSlice.actions;
	const dispatch = useDispatch();

	return (
		<SelectedMoviesLayout
			title="Starred Movies"
			emptyListMessage="You have no starred movies."
			removeAllTitle="Remove all starred"
			rootTestid="starred"
			movieListTestid="starred-movies"
			movies={starred.starredMovies}
			onRemoveAll={() => dispatch(clearAllStarred())}
			renderDetailComponent={(movie) => (
				<Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
			)}
		/>
	);
};

export default Starred;
