import { useEffect } from 'react';

// Another idea is to create a ref with useRef, to attach the event listener to any element in the DOM by passing the ref to the element.
// It is not necessary for this time though.
export const useInfiniteScroll = ({ onReachedEnd }) => {
	useEffect(() => {
		const calculateScrollEnd = () => {
			const { scrollTop, clientHeight, scrollHeight } =
				document.documentElement;
			if (scrollTop + clientHeight >= scrollHeight) {
				onReachedEnd();
			}
		};

		window.addEventListener('scroll', calculateScrollEnd);
		return () => {
			window.removeEventListener('scroll', calculateScrollEnd);
		};
	}, [onReachedEnd]);
};
