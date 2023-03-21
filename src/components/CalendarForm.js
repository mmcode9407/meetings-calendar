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
		const { firstName, lastName, email, date, time } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<label htmlFor='firstName'>Imię:</label>
				<input
					type='text'
					name='firstName'
					id='firstName'
					value={firstName}
					onChange={this.inputChange}
				/>
				<label htmlFor='lastName'>Nazwisko:</label>
				<input
					type='text'
					name='lastName'
					id='lastName'
					value={lastName}
					onChange={this.inputChange}
				/>
				<label htmlFor='email'>Email:</label>
				<input
					type='email'
					name='email'
					id='email'
					value={email}
					onChange={this.inputChange}
				/>
				<label htmlFor='date'>Data:</label>
				<input
					type='date'
					name='date'
					id='date'
					value={date}
					onChange={this.inputChange}
				/>
				<label htmlFor='time'>Godzina:</label>
				<input
					type='time'
					name='time'
					id='time'
					value={time}
					onChange={this.inputChange}
				/>
				<input type='submit' value={'Dodaj spotkanie'} />
			</form>
		);
	}
}
