import React, {PropTypes} from 'react';
import {NOT_WATCHING, WATCHING, ABANDON} from '../actions/actionTypes';

export default class AnimeItem extends React.Component {

	renderName(lang, name, name_cn) {
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

	renderSelector() {
		const {showSelect, status, lang} = this.props;

		if (showSelect) {
			return (
				<span>
					{NOT_WATCHING != status && <button>{StatusText[NOT_WATCHING][lang]}</button>}
					{WATCHING != status && <button>{StatusText[WATCHING][lang]}</button>}
					{ABANDON != status && <button>{StatusText[ABANDON][lang]}</button>}
				</span>
			);
		}
	}

	render() {
		const {lang, url, name, name_cn, air_date, img, doing, status} = this.props;
		return (
			<li onMouseEnter={() => {console.log('enter')}}
				onMouseLeave={() => console.log('leave')}>
				<a href={url}>{this.renderName(lang, name, name_cn)}</a>
				{' '}
				{air_date}
				{' '}
				{'Watching: '}
				{doing}
				{' '}
				{StatusText[status][lang]}
				{' '}
				{this.renderSelector()}
			</li>
		);
	}
}

AnimeItem.propTypes = {
	lang: PropTypes.oneOf(['en', 'cn', 'ja']).isRequired,
	url: PropTypes.string,
	name: PropTypes.string.isRequired,
	name_cn: PropTypes.string,
	air_date: PropTypes.string,
	img: PropTypes.string.isRequired,
	doing: PropTypes.number.isRequired,
	status: PropTypes.oneOf([NOT_WATCHING, WATCHING, ABANDON]).isRequired,
	showSelect: PropTypes.bool.isRequired
};

AnimeItem.defaultProps = {
	url: 'javascript:void(0);'
};

const StatusText = {
	[NOT_WATCHING]: {
		'en': 'not watching',
		'cn': '未看',
		'ja': '見てない'
	},
	[WATCHING]: {
		'en': 'watching',
		'cn': '在看',
		'ja': '見てる'
	},
	[ABANDON]: {
		'en': 'abandon',
		'cn': '抛弃',
		'ja': '捨てる'
	}
};