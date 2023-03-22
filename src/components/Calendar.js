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
			<section>
				<header>
					<h1>Meetings Calendar</h1>
					<div>
						<button>Dodaj spotkanie</button>
						<button>Usuń wszystkie</button>
					</div>
				</header>
				<CalendarForm
					onSubmit={this.addMeeting}
					formItems={[
						{
							name: 'firstName',
							label: 'Imię',
							type: 'text',
							required: true,
							pattern: '[a-z]{3,}',
						},
						{
							name: 'lastName',
							label: 'Nazwisko',
							type: 'text',
							required: true,
							pattern: '[a-z]{3,}',
						},
						{
							name: 'email',
							label: 'Email',
							type: 'email',
							required: true,
							pattern: '[0-9a-z_.-]+@[0-9a-z.-]+.[a-z]{2,3}',
						},
						{
							name: 'date',
							label: 'Data',
							type: 'date',
							required: true,
							pattern:
								'^([0-9]{4}[-/]?((0[13-9]|1[012])[-/]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[-/]?31|02[-/]?(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00)[-/]?02[-/]?29)$',
						},
						{
							name: 'time',
							label: 'Godzina',
							type: 'time',
							required: true,
							pattern: '^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$',
						},
					]}
				/>
				<CalendarList
					meetings={this.state.meetings}
					onClick={this.removeMeeting}
				/>
			</section>
		);
	}
}
