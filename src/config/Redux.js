import { createStore, compose, applyMiddleware } from 'redux'
// import { persistStore, autoRehydrate } from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import reducers from '../reducers'

const composer = compose(applyMiddleware(thunkMiddleware), /*autoRehydrate()*/);

const store = createStore(reducers, composer);

if (module.hot) {
	// Enable Webpack hot module replacement for reducers
	module.hot.accept('../reducers', () => {
		const nextRootReducer = require('../reducers/index');
		store.replaceReducer(nextRootReducer);
	});
}
export default store;
