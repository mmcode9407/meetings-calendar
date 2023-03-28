import React, { Component } from 'react';
import Button from '../button';

export default class CalendarFormMessage extends Component {
	render() {
		const { isMessageShow, openForm, onClick } = this.props;
		return (
			<div className={isMessageShow ? 'message message--show' : 'message'}>
				<p className='message__text'>
					Spotkanie dodane do listy!
					<br />
					Chcesz dodać kolejne czy zamknąć popup?
				</p>
				<div className='message__buttons'>
					<Button
						onClick={() => {
							openForm('isFormShow', true);
							openForm('isMessageShow', false);
						}}
						text={'Dodaj kolejne spotkanie'}
					/>
					<Button onClick={(e) => onClick(e)} text={'Zamknij'} />
				</div>
			</div>
		);
	}
}
