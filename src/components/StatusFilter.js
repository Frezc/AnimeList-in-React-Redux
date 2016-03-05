import React, {
	PropTypes
}
from 'react';
import {
	StatusText, NOT_WATCHING, WATCHING, ABANDON, ALL
}
from '../strings';

function renderFilter(status, props) {
	const {statusFilter,onStatusFilterChange,lang} = props;

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

function StatusFilter(props) {
	return (
		<span>
			Show:{' '}
			{renderFilter(ALL, props)}{' '}
			{renderFilter(NOT_WATCHING, props)}{' '}
			{renderFilter(WATCHING, props)}{' '}
			{renderFilter(ABANDON, props)}
		</span>
	);
}

StatusFilter.propTypes = {
	lang: PropTypes.oneOf(['en', 'cn', 'ja']).isRequired,
	statusFilter: PropTypes.oneOf([NOT_WATCHING, WATCHING, ABANDON, ALL]).isRequired,
	onStatusFilterChange: PropTypes.func
};

export default StatusFilter;