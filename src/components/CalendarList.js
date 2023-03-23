import React, { Component } from 'react';

import './CalendarList.css';

export default class CalendarList extends Component {
	render() {
		const { content } = this.props;
		return <ul className='manager__meetings-box'>{content}</ul>;
	}
}
