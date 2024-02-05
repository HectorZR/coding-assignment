import { useSelector } from 'react-redux';
import Movie from '../components/Movie';
import '../styles/movies.scss';

const Movies = () => {
	const { movies } = useSelector((state) => state);

	return (
		<div className="movie-list" data-testid="movies">
			{movies.results?.map((movie) => {
				return <Movie movie={movie} key={movie.id} />;
			})}
		</div>
	);
};

export default Movies;
