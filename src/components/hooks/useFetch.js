export function useFetch() {
	return (url, setValue, setKey) => {
		fetch(url)
			.then((data) => data.json())
			.then((json) => {
				const arr = Object.values(json).filter((data) => data.length);
				console.log(arr);

				const result = arr.filter((data) => {
					if (data.length) return data;
				});
				//setValue(result);
				setKey && setKey(Object.keys(json)[0]);
			});
	};
}
