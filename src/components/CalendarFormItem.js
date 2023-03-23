import React, { Component } from 'react';

export default class CalendarFormItem extends Component {
	showError(label) {
		const { formStateErrors } = this.props;

		const errorsByLabel = formStateErrors.filter((item) =>
			item.includes(label)
		);

		return errorsByLabel.map((err, index) => (
			<p className='form__error-text' key={index}>
				{err}
			</p>
		));
	}

	restrictPastDates() {
		const date = new Date();
		const day = this.formatText(date.getDate());
		const month = this.formatText(date.getMonth() + 1);
		const year = date.getFullYear();

		return `${year}-${month}-${day}`;
	}

	formatText(unit) {
		return `0${unit}`.length > 2 ? unit : `0${unit}`;
	}

	render() {
		const { item, formStateMeeting, inputChange, formStateErrors } = this.props;

		return (
			<div className='form__item'>
				<label
					className='form__item-label'
					htmlFor={item.name}>{`${item.label}:`}</label>
				<input
					className='form__item-input'
					type={item.type}
					min={item.type === 'date' ? this.restrictPastDates() : null}
					name={item.name}
					placeholder={item.placeholder}
					id={item.name}
					value={formStateMeeting[item.name]}
					onChange={(e) => inputChange(e)}
				/>
				{formStateErrors.length > 0 ? (
					<div className='form__error-box'>{this.showError(item.label)}</div>
				) : null}
			</div>
		);
	}
}
