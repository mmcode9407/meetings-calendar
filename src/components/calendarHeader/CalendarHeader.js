import React, { Component } from 'react';
import { FontAwesomeIcon, faHandshake } from '../icons';

export default class CalendarHeader extends Component {
	render() {
		const { children } = this.props;
		return (
			<header className='manager__menu menu'>
				<h1 className='menu__title'>
					<FontAwesomeIcon icon={faHandshake} /> Harmonogram spotkań
				</h1>
				<div className='menu__buttons'>{children}</div>
			</header>
		);
	}
}
