export const getTodayDate = () => {
	const date = new Date();
	const day = _formatText(date.getDate());
	const month = _formatText(date.getMonth() + 1);
	const year = date.getFullYear();

	return `${year}-${month}-${day}`;
};

export const getCurrentTime = () => {
	const date = new Date();
	const hours = _formatText(date.getHours());
	const minutes = _formatText(date.getMinutes());

	return `${hours}:${minutes}`;
};

const _formatText = (unit) => {
	return `0${unit}`.length > 2 ? unit : `0${unit}`;
};
