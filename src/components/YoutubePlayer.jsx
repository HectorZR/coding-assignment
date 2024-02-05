import ReactPlayer from 'react-player';

const YoutubePlayer = ({ videoKey }) => {
	if (!videoKey)
		return (
			<h6>No trailer available for selected movie. Please, try another one.</h6>
		);

	return (
		<ReactPlayer
			className="video-player"
			url={`https://www.youtube.com/watch?v=${videoKey}`}
			controls
			playing
			data-testid="youtube-player"
		/>
	);
};

export default YoutubePlayer;
