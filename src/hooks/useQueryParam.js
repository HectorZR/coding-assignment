import { useSearchParams } from 'react-router-dom';

export const useQueryParam = (param) => {
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get(param);

	return searchQuery;
};
