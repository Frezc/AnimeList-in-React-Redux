import React, {PropTypes} from 'react';
import AnimeWeekList from './AnimeWeekList';
import { connect } from 'react-redux';
import { fetchAnimelist, setAnimeStatusAll, showSelectors } from '../actions';
import { NOT_WATCHING } from '../actions/actionTypes';

//App Entry
class App extends React.Component {

  componentWillMount() {
  	const {dispatch} = this.props;
  	dispatch(fetchAnimelist());
  }

  render () {
  	const {dispatch, networkState, lang, animelist, showSelector, animeState} = this.props;

  	if (networkState.isLoading) {
  		return (
  			<div>Loading...</div>
  		);
  	} else if (networkState.success) {
	    return (
	    	<AnimeWeekList
	    		lang={lang}
	    		list={animelist}
	    		dispatch={dispatch}
	    		showSelector={showSelector}
	    		animeState={animeState}
	    	 />
	    );
	} else {
		return (
			<div>
				Fetch Fail. <br/>
				<button onClick={() => dispatch(fetchAnimelist())}>Refresh</button>
			</div>
		);
	}
  }
}

App.propTypes = {
	networkState: PropTypes.shape({
		isLoading: PropTypes.bool.isRequired,
		success: PropTypes.bool.isRequired,
	}).isRequired,
	lang: PropTypes.oneOf(['en', 'cn', 'ja']).isRequired,
	animelist: PropTypes.array.isRequired,
	showSelector: PropTypes.object.isRequired,
	animeState: PropTypes.object.isRequired
};

function select (state) {
	return state;
}

export default connect(select)(App);