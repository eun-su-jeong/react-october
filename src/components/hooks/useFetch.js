export function useFecth() {
	return (url, setValue, setKey) => {
		fetch(url)
			.then((data) => data.json())
			.then((json) => {
				setValue(Object.values(json)[0]);
				setKey && setKey(Object.keys(json)[0]);
			});
	};
}
