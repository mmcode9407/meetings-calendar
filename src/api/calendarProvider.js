const API_LINK = 'http://localhost:3005/meetings';

const getData = () => {
	return _fetchData();
};

const addData = (data) => {
	const options = {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' },
	};

	return _fetchData(options);
};

const removeData = (id) => {
	const options = { method: 'DELETE' };
	return _fetchData(options, `/${id}`);
};

const _fetchData = (options, additionalPath = '') => {
	const API_URL = `${API_LINK}${additionalPath}`;

	return fetch(API_URL, options).then((resp) => {
		if (resp.ok) {
			return resp.json();
		}
		throw new Error(resp.status);
	});
};

export { getData, addData, removeData };
