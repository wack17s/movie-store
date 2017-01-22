import lockr from 'lockr';

const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
const FAVORITE_LOADING = 'FAVORITE_LOADING';
const FAVORITE_SUCCESS = 'FAVORITE_SUCCESS';
const FAVORITE_FAILTURE = 'FAVORITE_FAILTURE';

const initialFavorites = {
	isLoading: false,
	isLoaded: false,
	items: []
};

export default function favorites(state = initialFavorites, action) {
  switch(action.type) {
    case ADD_FAVORITE:
    	return { ...state, items: action.payload }

    case REMOVE_FAVORITE:
    	return { ...state, items: action.payload }

    case FAVORITE_LOADING:
    	return { ...state, isLoading: true, isLoaded: false }

    case FAVORITE_SUCCESS:
    	return { ...state, items: action.payload, isLoaded: true, isLoading: false }

    case FAVORITE_FAILTURE:
    	return { ...state, error: action.payload, isLoaded: true, isLoading: false }

    default:
      return state
  }
}

export function addFavorite(movie) {
	lockr.sadd(['movies'+movie.id], movie);

	return function(dispatch) {
		dispatch({
			type: ADD_FAVORITE,
			payload: lockr.getAll()
		});
	}
}

export function fetchFavorites() {
	return function(dispatch) {
		dispatch({
			type: FAVORITE_SUCCESS,
			payload: lockr.getAll()
		});
	}
}

export function removeFavorite(movie) {
	lockr.rm(['movies'+movie.id]);

	return function(dispatch) {
		dispatch({
			type: REMOVE_FAVORITE,
			payload: lockr.getAll()
		});
	}
}
