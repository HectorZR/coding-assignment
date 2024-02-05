import Movie from '../components/Movie';
import '../styles/movies.scss';

const Movies = ({ movies }) => {
	return (
		<div className="movie-list" data-testid="movies">
			{movies.movies.results?.map((movie) => {
				return <Movie movie={movie} key={movie.id} />;
			})}
		</div>
	);
};

export default Movies;
