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
		this.setState({
			meeting: {
				[name]: value,
			},
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const { onSubmit } = this.props;

		this.validateForm();

		if (this.state.errors.length === 0) {
			onSubmit(this.state.meeting);
		}
	};

	validateForm() {
		const { formItems } = this.props;

		formItems.forEach(({ name, label, required, pattern = null }) => {
			if (required) {
				if (this.state.meeting[name] === '') {
					this.setState((state) => ({
						errors: [...state.errors, `Dane w polu ${label} są wymagane!`],
					}));
				}
			}

			if (pattern) {
				const reg = new RegExp(pattern);
				if (!reg.test(this.state.meeting[name])) {
					this.setState((state) => ({
						errors: [
							...state.errors,
							`Dane w polu ${label} nie są w odpowiednim formacie!`,
						],
					}));
				}
			}
		});
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
						value={this.state[name]}
						onChange={this.inputChange}
					/>
				</div>
			);
		});
		return (
			<>
				<form onSubmit={this.handleSubmit}>
					{inputs}
					<input type='submit' value={'Dodaj spotkanie'} />
				</form>
			</>
		);
	}
}
