import React, {PropTypes} from 'react';
import AnimeItem from './AnimeItem';
import { connect } from 'react-redux';
import { NOT_WATCHING, WATCHING, ABANDON, ALL } from '../strings';

class AnimeDayList extends React.Component {

	isShow(anime) {
		const {statusFilter, animeState} = this.props;

		if (statusFilter === ALL)
			return true;

		if (animeState[anime.id]) {
			return animeState[anime.id] === statusFilter;
		} else {
			return statusFilter === NOT_WATCHING;
		}
	}

	render() {
		const {lang, weekday, items, animeState, showSelector, dispatch} = this.props;

		return (
			<div>
				<div>{weekday[lang]}</div>
				<ul>
					{items.map(item => {
							if (this.isShow(item)) {
								return (
									<AnimeItem 
										{...item} 
										key={item.id}
										lang={lang}
										img={item.images.grid}
										status={animeState[item.id] || NOT_WATCHING}
										doing={item.collection.doing}
										showSelect={showSelector[item.id] || false}
										dispatch={dispatch} />
								);
							}
						}
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
	showSelector: PropTypes.object.isRequired,
	statusFilter: PropTypes.oneOf([NOT_WATCHING, WATCHING, ABANDON, ALL]).isRequired
};

function select (state) {
	return {
		animeState: state.animeState,
		showSelector: state.showSelector,
		statusFilter: state.statusFilter
	};
}

export default connect(select)(AnimeDayList);