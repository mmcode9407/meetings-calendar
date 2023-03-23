import React, { Component } from 'react';
import Button from '../button';
import CalendarFormItem from './CalendarFormItem';
import './CalendarForm.css';
import { FontAwesomeIcon, faRectangleXmark, faFloppyDisk } from '../icons';

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
			this.resetState();
		} else {
			this.setState({ errors: errors });
		}
	};

	handleClose = (e) => {
		e.preventDefault();

		const { closeForm } = this.props;
		closeForm();
		this.resetState();
	};

	resetState() {
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
	}

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

	renderFormInputs() {
		const { formItems } = this.props;

		return formItems.map((item, index) => {
			return (
				<CalendarFormItem
					key={index}
					item={item}
					formStateMeeting={this.state.meeting}
					formStateErrors={this.state.errors}
					inputChange={this.inputChange}
				/>
			);
		});
	}

	render() {
		const { isShow } = this.props;

		return (
			<div
				className={
					isShow
						? 'manager__form-shadow manager__form-shadow--show'
						: 'manager__form-shadow'
				}>
				<div
					className={
						isShow ? 'manager__form manager__form--show' : 'manager__form'
					}>
					<h2 className='form__title'>Dodaj Spotkanie</h2>
					<form className='form'>
						{this.renderFormInputs()}
						<div className='form__buttons'>
							<Button
								onClick={this.handleSubmit}
								className={'form__btn btn'}
								text={'Dodaj spotkanie'}
								icon={<FontAwesomeIcon icon={faFloppyDisk} />}
							/>
							<Button
								onClick={this.handleClose}
								className={'form__btn btn'}
								text={'Anuluj'}
								icon={<FontAwesomeIcon icon={faRectangleXmark} />}
							/>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
