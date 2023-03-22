import React, { Component } from 'react';

export default class CalendarForm extends Component {
	state = {
		meeting: {
			firstName: '',
			lastName: '',
			email: '',
			date: '',
			time: '',
		},
		errors: [],
	};

	inputChange = (e) => {
		const { name, value } = e.target;
		this.setState((state) => {
			return {
				meeting: {
					...state.meeting,
					[name]: value,
				},
			};
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const { onSubmit } = this.props;

		const errors = this.validateForm();

		if (errors.length === 0) {
			onSubmit(this.state.meeting);
			this.setState({
				meeting: {
					firstName: '',
					lastName: '',
					email: '',
					date: '',
					time: '',
				},
				errors: [],
			});
		} else {
			this.setState({ errors: errors });
		}
	};

	validateForm() {
		const { formItems } = this.props;
		const errors = [];

		formItems.forEach(({ name, label, required = false, pattern = null }) => {
			if (required) {
				if (this.state.meeting[name] === '') {
					errors.push(`Dane w polu ${label} są wymagane!`);
				}
			}

			if (pattern) {
				const reg = new RegExp(pattern, 'gi');
				if (!reg.test(this.state.meeting[name])) {
					errors.push(`Dane w polu ${label} nie są w odpowiednim formacie!`);
				}
			}
		});

		return errors;
	}

	showError(label) {
		const errorsByLabel = this.state.errors.filter((item) =>
			item.includes(label)
		);

		return errorsByLabel.map((err, index) => <p key={index}>{err}</p>);
	}

	render() {
		const { formItems } = this.props;

		const inputs = formItems.map(({ name, label, type }, index) => {
			return (
				<div key={index}>
					<label htmlFor={name}>{`${label}:`}</label>
					<input
						type={type}
						name={name}
						id={name}
						value={this.state.meeting[name]}
						onChange={this.inputChange}
					/>
					{this.state.errors.length > 0 ? this.showError(label) : null}
				</div>
			);
		});

		return (
			<>
				<form onSubmit={this.handleSubmit} noValidate>
					{inputs}
					<input type='submit' value={'Dodaj spotkanie'} />
				</form>
			</>
		);
	}
}
