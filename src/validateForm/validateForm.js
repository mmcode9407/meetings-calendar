const validateForm = (fields, formState) => {
	const errors = [];

	fields.forEach(({ name, label, required = false, pattern = null }) => {
		const value = formState[name];

		if (required) {
			if (value === '') {
				errors.push(`Dane w polu ${label} są wymagane!`);
			}
		}

		if (pattern) {
			const reg = new RegExp(pattern, 'gi');
			if (!reg.test(value)) {
				errors.push(`Dane w polu ${label} nie są w odpowiednim formacie!`);
			}
		}
	});

	return errors;
};

export default validateForm;
