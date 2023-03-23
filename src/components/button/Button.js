import React, { Component } from 'react';

export default class Button extends Component {
	render() {
		const { onClick, className, text, icon } = this.props;
		return (
			<button onClick={onClick} className={className}>
				{icon} {text}
			</button>
		);
	}
}
