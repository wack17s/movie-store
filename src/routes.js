import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App/App';
import Main from './containers/Main/Main';
import Favorites from './containers/Favorites/Favorites';
import FullMovie from './containers/FullMovie/FullMovie';

import { fetchPopular } from './modules/movies';
import { fetchFavorites } from './modules/favorites';

const onMainEnter = ({ dispatch }) => (nextState, replace, next) => {
	dispatch(fetchPopular())
    .then(() => { next(); })
    .catch((error) => { /* handler */ });
};

const onFavoriteEnter = ({ dispatch }) => {
	dispatch(fetchFavorites())
};

export default (store) => (
	<Router history={hashHistory}>
		<Route path="/" component={App} >
			<IndexRoute component={Main} onEnter={onMainEnter(store)} />
			<Route path="/favorites" component={Favorites} onEnter={onFavoriteEnter(store)} />
			<Route path='/movie/:id' component={FullMovie} />
		</Route>
	</Router>
);
