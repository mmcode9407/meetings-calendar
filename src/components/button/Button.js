import React, { Component } from 'react';
import './Button.css';

export default class Button extends Component {
	render() {
		const { onClick, text, icon } = this.props;
		return (
			<button onClick={onClick} className={`btn`}>
				{icon} {text}
			</button>
		);
	}
}
