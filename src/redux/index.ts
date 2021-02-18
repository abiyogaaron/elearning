import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import loginPageReducer from './reducer/loginPage';

const rootReducer = combineReducers({
  loginPage: loginPageReducer,
});

let composeEnhancer = compose;
if (process.env.NODE_ENV !== 'production') {
  composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  rootReducer,
  composeEnhancer(
    applyMiddleware(thunkMiddleware, logger),
  ),
);

export default store;
