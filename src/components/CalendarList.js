import React, { Component } from 'react';

export default class CalendarList extends Component {
	render() {
		const { meetings, onClick } = this.props;
		return (
			<ul>
				{meetings.map(({ firstName, lastName, email, date, time, id }) => {
					return (
						<li key={id}>
							<h2>
								{firstName} {lastName}
							</h2>
							<p>{email}</p>
							<p>{date}</p>
							<p>{time}</p>
							<button onClick={() => onClick(id)}>Usuń spotkanie</button>
						</li>
					);
				})}
			</ul>
		);
	}
}
