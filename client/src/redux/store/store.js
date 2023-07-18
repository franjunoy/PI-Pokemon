import { createStore, applyMiddleware, compose } from "redux";
import ThunkMiddleware from "redux-thunk";
import rootReducer from "../reducer/reducer";

const composeEnhancer = window._REDUCE_DEVTOOLS_EXTENSION_COMPOSE_||compose;
const store = createStore(
    rootReducer, 
    composeEnhancer(applyMiddleware(ThunkMiddleware))
);

export default store;