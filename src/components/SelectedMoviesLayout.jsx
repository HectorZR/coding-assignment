import { Link } from 'react-router-dom';

export const SelectedMoviesLayout = ({
	title,
	rootTestid,
	movieListTestid,
	removeAllTitle,
	emptyListMessage,
	movies = [],
	onRemoveAll = () => {},
	renderDetailComponent = () => {},
}) => {
	return (
		<div className="starred" data-testid={rootTestid}>
			{movies.length > 0 && (
				<div data-testid={movieListTestid} className="starred-movies">
					<h6 className="header">{title}</h6>
					<div className="row">
						{movies.map((movie) => renderDetailComponent(movie))}
					</div>

					<footer className="text-center">
						<button className="btn btn-primary" onClick={onRemoveAll}>
							{removeAllTitle}
						</button>
					</footer>
				</div>
			)}

			{movies.length === 0 && (
				<div className="text-center empty-cart">
					<i className="bi bi-star" />
					<p>{emptyListMessage}</p>
					<p>
						Go to <Link to="/">Home</Link>
					</p>
				</div>
			)}
		</div>
	);
};
