﻿import React, { Component } from 'react';
import { getData, addData, removeData } from '../calendarProvider';
import CalendarForm from './CalendarForm';
import CalendarList from './CalendarList';
import CalendarHeader from './CalendarHeader';
import CalendarListItem from './CalendarListItem';
import Button from './Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import './Calendar.css';
import { formItems } from '../formItems';

export default class Calendar extends Component {
	state = {
		meetings: [],
		isFormShow: false,
	};

	addMeeting = (data) => {
		addData(data).then((data) => {
			this.setState((state) => {
				return {
					meetings: [...state.meetings, data],
				};
			});
		});
	};

	removeMeeting = (id) => {
		removeData(id).then(
			getData().then((data) => {
				this.setState({
					meetings: data,
				});
			})
		);
	};

	removeAllMeeting = () => {
		this.state.meetings.forEach((meeting) => {
			removeData(meeting.id).then(
				getData().then((data) => {
					this.setState({
						meetings: data,
					});
				})
			);
		});
	};

	toogleShowForm = () => {
		this.setState({ isFormShow: !this.state.isFormShow });
	};

	renderCalendarListContent() {
		const { meetings } = this.state;

		if (meetings.length > 0) {
			return meetings.map((meeting) => {
				return (
					<CalendarListItem
						meetingData={meeting}
						removeMeeting={this.removeMeeting}
						key={meeting.id}
					/>
				);
			});
		} else {
			return <p>Brak zaplanowanych spotkań...</p>;
		}
	}

	componentDidMount() {
		getData().then((data) => {
			this.setState({
				meetings: data,
			});
		});
	}

	render() {
		return (
			<section className='manager'>
				<CalendarHeader>
					<Button
						onClick={this.toogleShowForm}
						className={'menu__btn btn'}
						text={'Dodaj spotkanie'}
						icon={<FontAwesomeIcon icon={faPlus} />}
					/>
					<Button
						onClick={this.removeAllMeeting}
						className={'menu__btn btn'}
						text={'Usuń wszystkie'}
						icon={<FontAwesomeIcon icon={faTrashCan} />}
					/>
				</CalendarHeader>
				<CalendarForm
					onSubmit={this.addMeeting}
					formItems={formItems}
					isShow={this.state.isFormShow}
					closeForm={this.toogleShowForm}
				/>
				<CalendarList content={this.renderCalendarListContent()} />
			</section>
		);
	}
}
