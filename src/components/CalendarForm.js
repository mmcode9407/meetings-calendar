import React, { Component } from 'react';
import Button from './Button';
import './CalendarForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-regular-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

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

	showError(label) {
		const errorsByLabel = this.state.errors.filter((item) =>
			item.includes(label)
		);

		return errorsByLabel.map((err, index) => (
			<p className='form__error-text' key={index}>
				{err}
			</p>
		));
	}

	restrictPastDates() {
		const date = new Date();
		const day = this.formatText(date.getDate());
		const month = this.formatText(date.getMonth() + 1);
		const year = date.getFullYear();

		return `${year}-${month}-${day}`;
	}

	formatText(unit) {
		return `0${unit}`.length > 2 ? unit : `0${unit}`;
	}

	render() {
		const { formItems, isShow } = this.props;

		const inputs = formItems.map(
			({ name, label, type, placeholder = null }, index) => {
				return (
					<div key={index} className='form__item'>
						<label
							className='form__item-label'
							htmlFor={name}>{`${label}:`}</label>
						<input
							className='form__item-input'
							type={type}
							min={type === 'date' ? this.restrictPastDates() : null}
							name={name}
							placeholder={placeholder}
							id={name}
							value={this.state.meeting[name]}
							onChange={this.inputChange}
						/>
						{this.state.errors.length > 0 ? (
							<div className='form__error-box'>{this.showError(label)}</div>
						) : null}
					</div>
				);
			}
		);

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
						{inputs}
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
