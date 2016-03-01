import React, {PropTypes} from 'react';
import AnimeWeekList from './AnimeWeekList';
import StatusFilter from '../components/StatusFilter';
import LangSelector from '../components/LangSelector';
import { connect } from 'react-redux';
import { fetchAnimelist, setStatusFilter, setLanguage } from '../actions';
import { NOT_WATCHING, WATCHING, ABANDON, ALL } from '../strings';

//App Entry
class App extends React.Component {

  componentWillMount() {
  	const {dispatch} = this.props;
  	dispatch(fetchAnimelist());
  }

  render () {
  	const {dispatch, networkState, lang, animelist, statusFilter} = this.props;

  	if (networkState.isLoading) {
  		return (
  			<div>Loading...</div>
  		);
  	} else if (networkState.success) {
	    return (
	    	<div>
	    		<StatusFilter
	    			lang={lang}
	    			statusFilter={statusFilter}
	    			onStatusFilterChange={status => dispatch(setStatusFilter(status))} />
	    		<LangSelector 
	    			style={styles.langSelector}
	    			lang={lang}
	    			onLangChange={lang => dispatch(setLanguage(lang))} />
		    	<AnimeWeekList
		    		lang={lang}
		    		list={animelist}
		    		dispatch={dispatch}
		    	 />
	    	</div>
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

const styles = {
	langSelector: {
		marginLeft: 16
	}
}

App.propTypes = {
	networkState: PropTypes.shape({
		isLoading: PropTypes.bool.isRequired,
		success: PropTypes.bool.isRequired,
	}).isRequired,
	lang: PropTypes.oneOf(['en', 'cn', 'ja']).isRequired,
	animelist: PropTypes.array.isRequired,
	statusFilter: PropTypes.oneOf([NOT_WATCHING, WATCHING, ABANDON, ALL]).isRequired,
};

function select (state) {
	return {
		networkState: state.networkState,
		lang: state.lang,
		animelist: state.animelist,
		statusFilter: state.statusFilter
	};
}

export default connect(select)(App);