import {combineReducers} from "redux";

import movies from "../modules/movies";
import movie from "../modules/movie";
import pagination from "../modules/pagination";
import favorites from "../modules/favorites";

const rootReducer = combineReducers({
    movies: movies,
    movie: movie,
    pagination: pagination,
    favorites: favorites
});

export default rootReducer;
