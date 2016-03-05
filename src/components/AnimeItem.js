import React, {PropTypes} from 'react';
import {NOT_WATCHING, WATCHING, ABANDON} from '../strings';
import { showSelector, setAnimeStatus } from '../actions';
import { StatusText } from '../strings';

function renderName(lang, name, name_cn) {
	let name_show = name;

	if (name_cn) {
		switch(lang) {
			case 'cn':
				name_show = name_cn;
		}
	}

	return (
		<span>{decodeURI(name_show)}</span>
	);
}

function renderSelector(props) {
	const {showSelect, status, lang, id, dispatch} = props;

	if (showSelect) {
		return (
			<span>
				{NOT_WATCHING != status && <button onClick={() => dispatch(setAnimeStatus(id, NOT_WATCHING))}>{StatusText[NOT_WATCHING][lang]}</button>}
				{WATCHING != status && <button onClick={() => dispatch(setAnimeStatus(id, WATCHING))}>{StatusText[WATCHING][lang]}</button>}
				{ABANDON != status && <button onClick={() => dispatch(setAnimeStatus(id, ABANDON))}>{StatusText[ABANDON][lang]}</button>}
			</span>
		);
	}
}

function AnimeItem(props) {
	const {lang, url, name, name_cn, air_date, img, doing, status, dispatch, id} = props;
	return (
		<li onMouseEnter={() => dispatch(showSelector(id, true))}
			onMouseLeave={() => dispatch(showSelector(id, false))}
			style={styles.item}>
			<a href={url} style={styles.title}>{renderName(lang, name, name_cn)}</a>
			{' '}
			{air_date}
			{' '}
			{'Watching: '}
			{doing}
			{' '}
			{StatusText[status][lang]}
			{' '}
			{renderSelector(props)}
		</li>
	);
}

const styles = {
	item: {
		minHeight: 24
	},
	title: {
		textDecoration: 'none',
		color: '#2196F3'
	}
};

AnimeItem.propTypes = {
	id: PropTypes.number.isRequired,
	lang: PropTypes.oneOf(['en', 'cn', 'ja']).isRequired,
	url: PropTypes.string,
	name: PropTypes.string.isRequired,
	name_cn: PropTypes.string,
	air_date: PropTypes.string,
	img: PropTypes.string.isRequired,
	doing: PropTypes.number.isRequired,
	status: PropTypes.oneOf([NOT_WATCHING, WATCHING, ABANDON]).isRequired,
	showSelect: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired
};

AnimeItem.defaultProps = {
	url: 'javascript:void(0);'
};

export default AnimeItem;