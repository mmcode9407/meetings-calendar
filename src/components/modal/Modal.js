import React, { Component } from 'react';
import './Modal.css';

export default class Modal extends Component {
	render() {
		const { children } = this.props;
		return <div className='shadow'>{children}</div>;
	}
}
