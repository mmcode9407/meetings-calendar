import React, { Component } from 'react';

export default class CalendarForm extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		date: '',
		time: '',
	};

	inputChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const { onSubmit } = this.props;

		onSubmit(this.state);
	};

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
			<form onSubmit={this.handleSubmit}>
				{inputs}
				<input type='submit' value={'Dodaj spotkanie'} />
			</form>
		);
	}
}
