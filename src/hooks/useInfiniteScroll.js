import { useEffect, useRef } from 'react';

export const useInfiniteScroll = ({ onReachedEnd }) => {
	const containerRef = useRef(null);
	useEffect(() => {
		const ref = containerRef.current;
		const intersectionObserver = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				onReachedEnd();
			}
		});

		if (containerRef.current) intersectionObserver.observe(ref);

		return () => {
			if (ref) intersectionObserver.unobserve(ref);
		};
	}, [onReachedEnd]);

	return containerRef;
};
