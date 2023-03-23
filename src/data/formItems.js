const formItems = [
	{
		name: 'firstName',
		label: 'Imię',
		type: 'text',
		required: true,
		pattern: '[a-z]{3,}',
		placeholder: 'Min 3 znaki...',
	},
	{
		name: 'lastName',
		label: 'Nazwisko',
		type: 'text',
		required: true,
		pattern: '[a-z]{3,}',
		placeholder: 'Min 3 znaki...',
	},
	{
		name: 'email',
		label: 'Adres email',
		type: 'email',
		required: true,
		pattern: '[0-9a-z_.-]+@[0-9a-z.-]+.[a-z]{2,3}',
		placeholder: 'example@example.pl',
	},
	{
		name: 'date',
		label: 'Data spotkania',
		type: 'date',
		required: true,
		pattern:
			'^([0-9]{4}[-/]?((0[13-9]|1[012])[-/]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[-/]?31|02[-/]?(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00)[-/]?02[-/]?29)$',
	},
	{
		name: 'time',
		label: 'Godzina spotkania',
		type: 'time',
		required: true,
		pattern: '^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$',
	},
];

export { formItems };
