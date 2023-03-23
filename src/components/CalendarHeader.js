import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';

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
