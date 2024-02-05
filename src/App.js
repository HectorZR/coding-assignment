import { useEffect } from 'react';
import {
	Routes,
	Route,
	createSearchParams,
	useSearchParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'reactjs-popup/dist/index.css';
import { fetchMovies } from './data/moviesSlice';
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from './constants';
import Header from './components/Header';
import Movies from './pages/Movies';
import Starred from './pages/Starred';
import WatchLater from './pages/WatchLater';
import './app.scss';
import { useQueryParam } from './hooks/useQueryParam';

const App = () => {
	const state = useSelector((state) => state);
	const { movies } = state;
	const dispatch = useDispatch();
	const [, setSearchParams] = useSearchParams();
	const searchQuery = useQueryParam('search');

	const getSearchResults = (query) => {
		if (query !== '') {
			dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${query}`));
			setSearchParams(createSearchParams({ search: query }));
		} else {
			dispatch(fetchMovies(ENDPOINT_DISCOVER));
			setSearchParams();
		}
	};

	const searchMovies = (query) => {
		getSearchResults(query);
	};

	useEffect(() => {
		if (searchQuery) {
			dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + searchQuery));
		} else {
			dispatch(fetchMovies(ENDPOINT_DISCOVER));
		}
	}, []);

	return (
		<div className="App">
			<Header searchMovies={searchMovies} />

			<div className="container">
				<Routes>
					<Route path="/" element={<Movies movies={movies} />} />
					<Route path="/starred" element={<Starred />} />
					<Route path="/watch-later" element={<WatchLater />} />
					<Route
						path="*"
						element={<h1 className="not-found">Page Not Found</h1>}
					/>
				</Routes>
			</div>
		</div>
	);
};

export default App;
