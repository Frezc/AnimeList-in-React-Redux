import React, {PropTypes} from 'react';
import AnimeItem from './AnimeItem';
import {NOT_WATCHING} from '../actions/actionTypes';

export default class AnimeDayList extends React.Component {

	render() {
		const {lang, weekday, items, animeState, showSelector} = this.props;

		return (
			<div>
				<div>{weekday[lang]}</div>
				<ul>
					{items.map(item => 
						<AnimeItem 
							{...item} 
							key={item.id}
							lang={lang}
							img={item.images.grid}
							status={animeState[item.id] || NOT_WATCHING}
							doing={item.collection.doing}
							showSelect={showSelector[item.id] || false} />
					)}
				</ul>
			</div>
		);
	}
}

AnimeDayList.propTypes = {
	lang: PropTypes.oneOf(['en', 'cn', 'ja']).isRequired,
	weekday: PropTypes.shape({
		en: PropTypes.string.isRequired,
		cn: PropTypes.string.isRequired,
		ja: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
	}).isRequired,
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		url: PropTypes.string,
		name: PropTypes.string.isRequired,
		name_cn: PropTypes.string,
		air_date: PropTypes.string,
		images: PropTypes.shape({
			grid: PropTypes.string.isRequired
		}).isRequired,
		collection: PropTypes.shape({
			doing: PropTypes.number.isRequired
		}).isRequired
	}).isRequired).isRequired,
	animeState: PropTypes.object.isRequired,
	showSelector: PropTypes.object.isRequired
};