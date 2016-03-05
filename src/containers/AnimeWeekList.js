import React, {PropTypes} from 'react';
import AnimeDayList from '../components/AnimeDayList';

function AnimeWeekList(props) {
	const {lang, list} = props;

	return (
		<div>
			{list.map(obj => 
				<AnimeDayList
					key={obj.weekday.id}
					lang={lang}
					weekday={obj.weekday}
					items={obj.items} />
			)}
		</div>
	);
}

export default AnimeWeekList;

AnimeWeekList.propTypes = {
	lang: PropTypes.oneOf(['en', 'cn', 'ja']).isRequired,
	list: PropTypes.arrayOf(PropTypes.shape({
		weekday: PropTypes.shape({
			id: PropTypes.number.isRequired
		}).isRequired,
		items: PropTypes.array.isRequired
	})).isRequired
};