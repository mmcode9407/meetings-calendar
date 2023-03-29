import React, { Component } from 'react';

export default class CalendarFormControls extends Component {
	showError(label) {
		const {
			formState: { errors },
		} = this.props;

		const errorsByLabel = errors.filter((item) => item.includes(label));

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
		const {
			item,
			formState: { meeting, errors },
			inputChange,
		} = this.props;

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
					value={meeting[item.name]}
					onChange={(e) => inputChange(e)}
				/>
				{errors.length > 0 ? (
					<div className='form__error-box'>{this.showError(item.label)}</div>
				) : null}
			</div>
		);
	}
}
