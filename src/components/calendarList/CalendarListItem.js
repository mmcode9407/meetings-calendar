import React, { Component } from 'react';
import Button from '../button';

export default class CalendarListItem extends Component {
	render() {
		const { meetingData, removeMeeting } = this.props;
		return (
			<li className='meetings-box__item'>
				<h2 className='item__header'>
					{meetingData.firstName} {meetingData.lastName}
				</h2>
				<p className='item__text'>{meetingData.email}</p>
				<p className='item__text'>{meetingData.date}</p>
				<p className='item__text'>{meetingData.time}</p>
				<Button
					onClick={() => removeMeeting(meetingData.id)}
					text={'Usuń spotkanie'}
				/>
			</li>
		);
	}
}
