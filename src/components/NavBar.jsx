import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
	const { starredMovies } = useSelector((state) => state.starred);
	return (
		<nav>
			<NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
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
				Watch Later
			</NavLink>
		</nav>
	);
};
