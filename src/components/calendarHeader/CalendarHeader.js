import React, { Component } from 'react';
import { FontAwesomeIcon, faHandshake } from '../icons';
import './CalendarHeader.css';

export default class CalendarHeader extends Component {
	render() {
		const { children } = this.props;
		return (
			<header className='header'>
				<h1 className='header__title'>
					<FontAwesomeIcon icon={faHandshake} /> Harmonogram spotkań
				</h1>
				<div className='header__buttons-box'>{children}</div>
			</header>
		);
	}
}
