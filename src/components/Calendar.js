import React, { Component } from 'react';
import { getData, addData, removeData } from '../calendarProvider';
import CalendarForm from './CalendarForm';
import CalendarList from './CalendarList';

export default class Calendar extends Component {
	state = {
		meetings: [],
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

	componentDidMount() {
		getData().then((data) => {
			this.setState({
				meetings: data,
			});
		});
	}

	render() {
		return (
			<div>
				<CalendarForm onSubmit={this.addMeeting} />
				<CalendarList
					meetings={this.state.meetings}
					onClick={this.removeMeeting}
				/>
			</div>
		);
	}
}
