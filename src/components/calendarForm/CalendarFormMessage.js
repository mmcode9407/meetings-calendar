import React, { Component } from 'react';

export default class CalendarFormMessage extends Component {
	render() {
		const { children } = this.props;
		return (
			<div className='message'>
				<p className='message__text'>
					Spotkanie dodane do listy!
					<br />
					Chcesz dodać kolejne czy zamknąć popup?
				</p>
				<div className='message__buttons'>{children}</div>
			</div>
		);
	}
}
