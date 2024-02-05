import {
	Link,
	NavLink,
	createSearchParams,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../styles/header.scss';

const Header = () => {
	const navigate = useNavigate();
	const [, setSearchParams] = useSearchParams();
	const { starredMovies } = useSelector((state) => state.starred);

	const handleSearchMovies = (value) => {
		navigate('/');

		if (value !== '') {
			setSearchParams(createSearchParams({ search: value }));
		} else {
			setSearchParams();
		}
	};

	return (
		<header>
			<Link to="/" data-testid="home" onClick={() => handleSearchMovies('')}>
				<i className="bi bi-film" />
			</Link>

			<nav>
				<NavLink
					to="/starred"
					data-testid="nav-starred"
					className="nav-starred"
				>
					{starredMovies.length > 0 ? (
						<>
							<i className="bi bi-star-fill bi-star-fill-white" />
							<sup className="star-number">{starredMovies.length}</sup>
						</>
					) : (
						<i className="bi bi-star" />
					)}
				</NavLink>
				<NavLink to="/watch-later" className="nav-fav">
					watch later
				</NavLink>
			</nav>

			<div className="input-group rounded">
				<Link
					to="/"
					onClick={() => handleSearchMovies('')}
					className="search-link"
				>
					<input
						type="search"
						data-testid="search-movies"
						onKeyUp={(e) => handleSearchMovies(e.target.value)}
						className="form-control rounded"
						placeholder="Search movies..."
						aria-label="Search movies"
						aria-describedby="search-addon"
					/>
				</Link>
			</div>
		</header>
	);
};

export default Header;
