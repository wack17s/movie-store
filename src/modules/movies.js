import axios from 'axios';

const MOVIES_LOADING = 'MOVIES_LOADING';
const MOVIES_SUCCESS = 'MOVIES_SUCCESS';
const MOVIES_FAILURE = 'MOVIES_FAILURE';

const initialMovies = {
	isLoading: false,
	isLoaded: false,
	items: [],
	error: null,
};

export default function movies(state = initialMovies, action) {
  switch(action.type) {
    case MOVIES_LOADING:
     	return { ...state, isLoading: true, isLoaded: false }

    case MOVIES_SUCCESS:
     	return { ...state, items: action.payload, isLoaded: true, isLoading: false }

    case MOVIES_FAILURE:
    	return { ...state, isLoading: false, isLoaded: false, error: action.payload }

    default:
      return state
  }
}

const key = 'c710ec5b42d2d631bab95767eec5608a';

//actions
export function fetchPopular() {
	return function(dispatch) {
		dispatch({
			type: MOVIES_LOADING
		});

		return axios.get(`https://api.themoviedb.org/3/movie/popular?
			api_key=${key}&language=en-US`)
			.then(response => {
				dispatch({
					type: MOVIES_SUCCESS,
					payload: response.data.results
				});
			})
			.catch(error => {
				dispatch({
					type: MOVIES_FAILURE,
					payload: error
				});
			});
	}
}

export function fetchSearch(query) {
	return function(dispatch) {
		dispatch({
			type: MOVIES_LOADING
		});

		return axios.get(`https://api.themoviedb.org/3/search/movie?
			api_key=${key}&language=en-US&query=${query}`)
			.then(response => {
				dispatch({
					type: MOVIES_SUCCESS,
					payload: response.data.results
				});
			})
			.catch(error => {
				dispatch({
					type: MOVIES_FAILURE,
					payload: error
				});
			});
	}
}

export function fetchRecomendations(id) {
	return function(dispatch) {
		dispatch({
			type: MOVIES_LOADING
		});

		return axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${key}&language=en-US`)
			.then(response => {
				dispatch({
					type: MOVIES_SUCCESS,
					payload: response.data.results
				});
			})
			.catch(error => {
				dispatch({
					type: MOVIES_FAILURE,
					payload: error
				});
			});
	}
}
