import React, {
	PropTypes
}
from 'react';
import {
	StatusText, NOT_WATCHING, WATCHING, ABANDON, ALL
}
from '../strings';

export default class StatusFilter extends React.Component {

	renderFilter(status) {
		const {statusFilter,onStatusFilterChange,lang} = this.props;

		console.log(StatusText)
		if (statusFilter === status) {
			return StatusText[status][lang];
		}

		return (
			<a href="#"
				onClick={e => {
					e.preventDefault();
					onStatusFilterChange && 
						onStatusFilterChange(status);
				}}
			>{StatusText[status][lang]}</a>
		);
	}

	render() {
		return (
			<span>
				Show:{' '}
				{this.renderFilter(ALL)}{' '}
				{this.renderFilter(NOT_WATCHING)}{' '}
				{this.renderFilter(WATCHING)}{' '}
				{this.renderFilter(ABANDON)}
			</span>
		);
	}
}

StatusFilter.propTypes = {
	lang: PropTypes.oneOf(['en', 'cn', 'ja']).isRequired,
	statusFilter: PropTypes.oneOf([NOT_WATCHING, WATCHING, ABANDON, ALL]).isRequired,
	onStatusFilterChange: PropTypes.func
};