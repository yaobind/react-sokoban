import React from 'react';
import { Provider } from 'react-redux'
import store from './config/Redux'

import { loadMap } from './actions/game';

import Router from './router'

export default class App extends React.Component {

	componentWillMount() {
		store.dispatch(loadMap(0));
	}
	render() {
		return (
			<Provider store={store} >
				<Router />
			</Provider>
		)
	}
}
