import fetch from 'isomorphic-fetch';
import {
	FETCH_ANIMELIST, STATUS_SUCCESS, STATUS_ERROR, SET_ANIME_STATUS, SHOW_SELECTOR
}
from './actionTypes';

const BGMCALENDAR_URL = 'http://api.frezc.com/fetchAnimelist';

function requestAnimelist() {
	return {
		type: FETCH_ANIMELIST
	};
}

function receiveAnimelist(json) {
	return {
		type: FETCH_ANIMELIST,
		status: STATUS_SUCCESS,
		result: json
	}
}

function errorAnimelist(error) {
	return {
		type: FETCH_ANIMELIST,
		status: STATUS_ERROR,
	}
}

export function fetchAnimelist() {
	return (dispatch, getState) => {
		dispatch(requestAnimelist());

		return fetch(BGMCALENDAR_URL)
			.then(response => response.json())
			.then(json => dispatch(receiveAnimelist(json)))
			.catch(error => dispatch(errorAnimelist(error)))
	}
}

export function setAnimeStatus(id, status) {
	return {
		type: SET_ANIME_STATUS,
		id: id,
		status: status
	}
}

export function setAnimeStatusAll(status) {
	return {
		type: SET_ANIME_STATUS,
		status: status
	}
}

export function showSelector(id, show) {
	return {
		type: SHOW_SELECTOR,
		id: id,
		show: show
	}
}

export function showSelectors(show) {
	return {
		type: SHOW_SELECTOR,
		show: show
	}
}