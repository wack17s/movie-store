const CHANGE_PAGE = 'CHANGE_PAGE';

const initialPagination = {
  activePage: 1,
  activePageR: 1
}

export default function pagination(state = initialPagination, action) {
  switch(action.type) {
    case CHANGE_PAGE:
     	return { ...state, activePage: action.activePage || state.activePage, activePageR: action.activePageR || state.activePageR }

    default:
      return state
  }
}

export function changePage(pagkey, rec) {
	return function(dispatch) {
    if (rec) {
			dispatch({
				type: CHANGE_PAGE,
				activePageR: pagkey
			});
    } else {
      dispatch({
        type: CHANGE_PAGE,
        activePage: pagkey
      });
    }
	}
}
