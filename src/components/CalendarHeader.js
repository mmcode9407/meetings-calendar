import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default class CalendarHeader extends Component {
	render() {
		const { showForm, removeAllMeeting } = this.props;
		return (
			<header className='manager__menu menu'>
				<h1 className='menu__title'>
					<FontAwesomeIcon icon={faHandshake} /> Harmonogram spotkań
				</h1>
				<div className='menu__buttons'>
					<button className='menu__btn btn' onClick={() => showForm()}>
						<FontAwesomeIcon icon={faPlus} /> Dodaj spotkanie
					</button>
					<button className='menu__btn btn' onClick={() => removeAllMeeting()}>
						<FontAwesomeIcon icon={faTrashCan} /> Usuń wszystkie
					</button>
				</div>
			</header>
		);
	}
}
