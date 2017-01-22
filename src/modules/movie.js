import axios from 'axios';

const MOVIE_LOADING = 'MOVIE_LOADING';
const MOVIE_SUCCESS = 'MOVIE_SUCCESS';
const MOVIE_FAILURE = 'MOVIE_FAILURE';

const initialMovie = {
	isLoading: false,
	isLoaded: false,
	item: null,
	error: null,
};

export default function movie(state = initialMovie, action) {
  switch(action.type) {
    case MOVIE_LOADING:
     	return { ...state, isLoading: true, isLoaded: false }

    case MOVIE_SUCCESS:
     	return { ...state, item: action.payload, isLoaded: true, isLoading: false }

    case MOVIE_FAILURE:
    	return { ...state, isLoading: false, isLoaded: false, error: action.payload }

    default:
      return state
  }
}

const key = 'c710ec5b42d2d631bab95767eec5608a';

export function openMovie(id) {
	return function(dispatch) {
		dispatch({
			type: MOVIE_LOADING
		});

		return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`)
			.then(response => {
				dispatch({
					type: MOVIE_SUCCESS,
					payload: response.data
				});
			})
			.catch(error => {
				dispatch({
					type: MOVIE_FAILURE,
					payload: error
				});
			});
	}
}
