import React, { Component } from 'react';
import Button from '../button';
import CalendarFormItem from './CalendarFormItem';
import CalendarFormMessage from './CalendarFormMessage';
import './CalendarForm.css';
import validateForm from '../../validateForm';
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

		const { onSubmit, formItems } = this.props;

		const errors = validateForm(formItems, this.state.meeting);

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
		closeForm('isFormShow', false);
		closeForm('isShadowShow', false);
		closeForm('isMessageShow', false);
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
		const { isFormShow, isShadowShow, isMessageShow, openForm } = this.props;

		return (
			<div
				className={
					isShadowShow
						? 'form-box-shadow form-box-shadow--show'
						: 'form-box-shadow'
				}>
				<div className={isFormShow ? 'form-box form-box--show' : 'form-box'}>
					<h2 className='form-box__title'>Dodaj Spotkanie</h2>
					<form className='form-box__form'>
						{this.renderFormInputs()}
						<div className='form__buttons'>
							<Button
								onClick={this.handleSubmit}
								text={'Dodaj spotkanie'}
								icon={<FontAwesomeIcon icon={faFloppyDisk} />}
							/>
							<Button
								onClick={this.handleClose}
								text={'Anuluj'}
								icon={<FontAwesomeIcon icon={faRectangleXmark} />}
							/>
						</div>
					</form>
				</div>
				<CalendarFormMessage
					isMessageShow={isMessageShow}
					openForm={openForm}
					onClick={this.handleClose}
				/>
			</div>
		);
	}
}
