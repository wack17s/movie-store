const CHANGE_PAGE = 'CHANGE_PAGE';

const initialPagination = {
  activePage: 1
}

export default function pagination(state = initialPagination, action) {
  switch(action.type) {
    case CHANGE_PAGE:
     	return { ...state, activePage: action.activePage }

    default:
      return state
  }
}

export function changePage(pagkey) {
	return function(dispatch) {
				dispatch({
					type: CHANGE_PAGE,
					activePage: pagkey
				});
	}
}
