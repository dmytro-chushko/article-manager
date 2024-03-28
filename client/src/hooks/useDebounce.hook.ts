import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number): string => {
	const [debouncedValue, setDebouncedValue] = useState<string>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [delay, value]);

	return debouncedValue;
};
