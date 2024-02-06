import Popup from 'reactjs-popup';
import '../styles/youtubePlayerModal.scss';
import YoutubePlayer from './YoutubePlayer';
import { useGetMovieTrailerByIdQuery } from '../services/movieApi';
import { useState } from 'react';
import { Loader } from './Loader';

export const YoutubePlayerModal = ({ movieId }) => {
	const [selectedId, setSelectedId] = useState('');
	const { data: videoKey, isLoading } = useGetMovieTrailerByIdQuery(movieId, {
		skip: !selectedId,
	});

	return (
		<Popup
			modal
			closeOnEscape
			onOpen={() => setSelectedId(movieId)}
			contentStyle={
				videoKey
					? { backgroundColor: 'transparent', border: 'none' }
					: undefined
			}
			trigger={
				<button type="button" className="btn btn-dark">
					View Trailer
				</button>
			}
		>
			{(close) => (
				<section className="dialog-box">
					{isLoading ? <Loader /> : <YoutubePlayer videoKey={videoKey} />}
					<div>
						<button type="button" onClick={close}>
							&times;
						</button>
					</div>
				</section>
			)}
		</Popup>
	);
};
