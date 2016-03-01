import fetch from 'isomorphic-fetch';
import {
	FETCH_ANIMELIST, STATUS_SUCCESS, STATUS_ERROR, SET_ANIME_STATUS, SHOW_SELECTOR, SET_STATUS_FILTER, SET_LANGUAGE
}
from './actionTypes';

//test
import data from '../../showData';

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

		/*
		return fetch(BGMCALENDAR_URL)
			.then(response => response.json())
			.then(json => dispatch(receiveAnimelist(json)))
			.catch(error => dispatch(errorAnimelist(error)))
		*/

		//Local data
		dispatch(receiveAnimelist(data));
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

export function setStatusFilter (status) {
	return {
		type: SET_STATUS_FILTER,
		status: status
	}
}

export function setLanguage (lang) {
	return {
		type: SET_LANGUAGE,
		lang: lang
	}
}