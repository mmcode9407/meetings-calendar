import React, { Component } from 'react';
import CalendarForm from '../calendarForm';
import { CalendarList, CalendarListItem } from '../calendarList';
import CalendarHeader from '../calendarHeader';
import Button from '../button';

import { FontAwesomeIcon, faPlus, faTrashCan } from '../icons';

import './Calendar.css';
import { getData, addData, removeData } from '../../api';

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
		this.state.meetings.forEach((meeting) => this.removeMeeting(meeting.id));
	};

	toogleFormShow = () => {
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
			<section className='wrapper'>
				<CalendarHeader>
					<Button
						onClick={this.toogleFormShow}
						text={'Dodaj spotkanie'}
						icon={<FontAwesomeIcon icon={faPlus} />}
					/>
					<Button
						onClick={this.removeAllMeeting}
						text={'Usuń wszystkie'}
						icon={<FontAwesomeIcon icon={faTrashCan} />}
					/>
				</CalendarHeader>
				{this.state.isFormShow && (
					<CalendarForm
						onSubmit={this.addMeeting}
						closeForm={this.toogleFormShow}
					/>
				)}
				<CalendarList content={this.renderCalendarListContent()} />
				{this.state.isFormShow && <div className='shadow'></div>}
			</section>
		);
	}
}
