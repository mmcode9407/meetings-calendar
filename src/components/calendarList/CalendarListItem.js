import React, { Component } from 'react';
import Button from '../button';

export default class CalendarListItem extends Component {
	render() {
		const { meetingData, removeMeeting } = this.props;
		return (
			<li className='manager__meetings-item'>
				<h2 className='meetings__item-header'>
					{meetingData.firstName} {meetingData.lastName}
				</h2>
				<p className='meetings__item-text'>{meetingData.email}</p>
				<p className='meetings__item-text'>{meetingData.date}</p>
				<p className='meetings__item-text'>{meetingData.time}</p>
				<Button
					onClick={() => removeMeeting(meetingData.id)}
					className={'meetings__item-btn'}
					text={'Usuń spotkanie'}
				/>
			</li>
		);
	}
}
