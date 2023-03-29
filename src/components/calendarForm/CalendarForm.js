import React, { Component } from 'react';
import Button from '../button';
// import CalendarFormItem from './CalendarFormItem';
import CalendarFormMessage from './CalendarFormMessage';
import CalendarFormBody from './CalendarFormBody';
import './CalendarForm.css';
import validateForm from '../../validateForm';
import formItems from '../../data';
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
		content: 'form',
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
		const { meeting } = this.state;

		const errors = validateForm(formItems, meeting);

		if (errors.length === 0) {
			onSubmit(meeting);
			this.setContentValue();
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

	setContentValue = () => {
		this.setState((state) => {
			if (state.content === 'form') {
				return { content: 'confirm' };
			} else {
				return { content: 'form' };
			}
		});
	};

	render() {
		const componentList = {
			form: (
				<CalendarFormBody formState = {this.state} inputChange={this.inputChange}>
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
				</CalendarFormBody>
			),
			confirm: (
				<CalendarFormMessage>
					<Button
						onClick={this.setContentValue}
						text={'Dodaj kolejne spotkanie'}
						/>
					<Button onClick={this.handleClose} text={'Zamknij'}
						icon={<FontAwesomeIcon icon={faRectangleXmark} />}
						/>
				</CalendarFormMessage>
			),
		};

		return <>{componentList[this.state.content]}</>;
	}
}
