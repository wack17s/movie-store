import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App/App';
import Main from './containers/Main/Main';
import Favorites from './containers/Favorites/Favorites';
import FullMovie from './containers/FullMovie/FullMovie';

import { fetchPopular, fetchRecomendations } from './modules/movies';
import { fetchFavorites } from './modules/favorites';
import { openMovie } from './modules/movie';

const onMainEnter = ({ dispatch }) => (nextState, replace, next) => {
	dispatch(fetchPopular())
    .then(() => { next(); })
    .catch((error) => { /* handler */ });
};

const onFullMovieEnter = ({ dispatch }) => (nextState, replace, next) => {
	dispatch(openMovie(nextState.params.id))
		.then(() => dispatch(fetchRecomendations(nextState.params.id)))
		.then(() => { next(); })
    .catch((error) => { /* handler */ });
};

export default (store) => (
	<Router history={hashHistory}>
		<Route path="/" component={App} >
			<IndexRoute component={Main} onEnter={onMainEnter(store)} />
			<Route path="/favorites" component={Favorites} />
			<Route path='/movie/:id' component={FullMovie} onEnter={onFullMovieEnter(store)} />
		</Route>
	</Router>
);
