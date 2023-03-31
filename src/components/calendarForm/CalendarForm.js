import React, { Component } from 'react';
import Button from '../button';
import CalendarFormMessage from './CalendarFormMessage';
import CalendarFormBody from './CalendarFormBody';
import './CalendarForm.css';
import validateForm from '../../validateForm';
import formItems from '../../data';
import { getTodayDate, getCurrentTime } from '../../constant';
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

		const { onSubmit, additionalValidation } = this.props;
		const { meeting } = this.state;

		const errors = validateForm(formItems, meeting);

		if (errors.length === 0 && !additionalValidation(meeting)) {
			const data = this.createDataForAPI();
			onSubmit(data);
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

	createDataForAPI() {
		const { meeting } = this.state;
		return {
			...meeting,
			timeStamp: new Date(`${meeting.date} ${meeting.time}`).getTime(),
		};
	}

	resetState() {
		this.setState({
			meeting: {
				firstName: '',
				lastName: '',
				email: '',
				date: getTodayDate(),
				time: getCurrentTime(),
			},
			errors: [],
		});
	}

	setContentValue = () => {
		this.setState((state) => {
			if (state.content === 'form') {
				return { content: 'confirm' };
			}

			return { content: 'form' };
		});
	};

	componentDidMount() {
		this.setState({
			meeting: {
				...this.state.meeting,
				date: getTodayDate(),
				time: getCurrentTime(),
			},
		});
	}

	render() {
		const componentList = {
			form: (
				<CalendarFormBody
					formState={this.state}
					inputChange={this.inputChange}
					isUniqueMeeting={this.props.additionalValidation(this.state.meeting)}>
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
					<Button
						onClick={this.handleClose}
						text={'Zamknij'}
						icon={<FontAwesomeIcon icon={faRectangleXmark} />}
					/>
				</CalendarFormMessage>
			),
		};

		return <>{componentList[this.state.content]}</>;
	}
}
