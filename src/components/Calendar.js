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
				<CalendarForm
					onSubmit={this.addMeeting}
					formItems={[
						{ name: 'firstName', label: 'Imię', type: 'text', required: true },
						{
							name: 'lastName',
							label: 'Nazwisko',
							type: 'text',
							required: true,
						},
						{
							name: 'email',
							label: 'Email',
							type: 'email',
							required: true,
							pattern: '[0-9a-z_.-]+@[0-9a-z.-]+.[a-z]{2,3}',
						},
						{ name: 'date', label: 'Data', type: 'date', required: true },
						{ name: 'time', label: 'Godzina', type: 'time', required: true },
					]}
				/>
				<CalendarList
					meetings={this.state.meetings}
					onClick={this.removeMeeting}
				/>
			</div>
		);
	}
}
