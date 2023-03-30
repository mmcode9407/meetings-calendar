import React, { Component } from 'react';
import CalendarFormControls from './CalendarFormControls';
import formItems from '../../data';

export default class CalendarFormBody extends Component {
	renderFormInputs() {
		const { formState, inputChange } = this.props;

		return formItems.map((item, index) => {
			return (
				<CalendarFormControls
					key={index}
					item={item}
					formState={formState}
					inputChange={inputChange}
				/>
			);
		});
	}

	render() {
		const { children, isUniqueMeeting } = this.props;
		return (
			<div className='form-box'>
				<h2 className='form-box__title'>Dodaj Spotkanie</h2>
				{isUniqueMeeting && (
					<p className='form-box__error-unique'>
						Spotkanie w podanym terminie już istnieje!
					</p>
				)}
				<form className='form-box__form'>
					{this.renderFormInputs()}
					<div className='form__buttons'>{children}</div>
				</form>
			</div>
		);
	}
}
