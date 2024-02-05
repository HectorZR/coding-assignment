import {
	Link,
	createSearchParams,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';
import '../styles/header.scss';
import { NavBar } from './NavBar';

const Header = () => {
	const navigate = useNavigate();
	const [, setSearchParams] = useSearchParams();

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

			<NavBar />

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
