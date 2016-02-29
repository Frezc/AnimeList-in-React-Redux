import {
	FETCH_ANIMELIST, STATUS_SUCCESS, STATUS_ERROR, SET_ANIME_STATUS, SHOW_SELECTOR, SET_STATUS_FILTER
}
from './actions/actionTypes';
import { ALL } from './strings';

/**
	state tree
	{
		lang: 'cn',
		networkState: {
			isLoading: true,
			success: false,
		},
		animeState: {
			117601(id): WATCHING,
			...
		},
		showSelector: {
			117601: false,
			...
		},
		statusFilter: String,
		animelist: [...jsonData]
	}
**/

function lang(state = 'cn', action) {
	switch (action.type) {
		default: return state;
	}
}

function networkState(state = {
	isLoading: true,
	success: false
}, action) {
	switch (action.type) {
		case FETCH_ANIMELIST:
			switch (action.status) {
				case STATUS_SUCCESS:
					return {
						isLoading: false,
						success: true
					};
				case STATUS_ERROR:
					return {
						isLoading: false,
						success: false,
					};
				default:
					return {
						isLoading: true,
						success: false
					};
			}
		default:
			return state;
	}
}

function getIdList(animelist) {
	let idlist = [];
	animelist.length > 0 && animelist.map(day => {
		day.items.map(item => {
			idlist.push(item.id);
		})
	});

	return idlist;
}

function animeState(state = {}, action, animelist = []) {
	switch (action.type) {
		case SET_ANIME_STATUS:
			if (action.id) {
				return Object.assign({}, state, {
					[action.id]: action.status
				});
			} else {
				let nexts = {};
				let idlist = getIdList(animelist);
				idlist.map(id => {
					nexts[id] = action.status
				});

				return nexts;
			}
		default:
			return state;
	}
}

function showSelector(state = {}, action, animelist = []) {
	switch (action.type) {
		case SHOW_SELECTOR:
			if (action.id) {
				return Object.assign({}, state, {
					[action.id]: action.show
				});
			} else {
				let nexts = {};
				let idlist = getIdList(animelist);
				idlist.map(id => {
					nexts[id] = action.show
				});
				return nexts;
			}
		default:
			return state;
	}
}

function statusFilter (state = ALL, action) {
	switch(action.type) {
		case SET_STATUS_FILTER:
			return action.status;
		default:
			return state;
	}
}

function animelist(state = [], action) {
	switch (action.type) {
		case FETCH_ANIMELIST:
			switch (action.status) {
				case STATUS_SUCCESS:
					return action.result;
				default:
					return state;
			}
		default:
			return state;
	}
}

function rootReducer(state = {}, action) {
	return {
		lang: lang(state.lang, action),
		networkState: networkState(state.networkState, action),
		animeState: animeState(state.animeState, action, state.animelist),
		showSelector: showSelector(state.showSelector, action, state.animelist),
		statusFilter: statusFilter(state.statusFilter, action),
		animelist: animelist(state.animelist, action)
	}
}

export default rootReducer;