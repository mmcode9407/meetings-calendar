import React, { Component } from 'react';
import './CalendarList.css';

export default class CalendarList extends Component {
	render() {
		const { meetings, removeMeeting } = this.props;
		return (
			<ul className='manager__meetings-box'>
				{meetings.map(({ firstName, lastName, email, date, time, id }) => {
					return (
						<li className='manager__meetings-item' key={id}>
							<h2 className='meetings__item-header'>
								{firstName} {lastName}
							</h2>
							<p className='meetings__item-text'>{email}</p>
							<p className='meetings__item-text'>{date}</p>
							<p className='meetings__item-text'>{time}</p>
							<button
								className='meetings__item-btn'
								onClick={() => removeMeeting(id)}>
								Usuń spotkanie
							</button>
						</li>
					);
				})}
			</ul>
		);
	}
}
