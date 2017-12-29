/**
 * Created by armanddu on 31/01/17.
 */
import React from 'react';
import {Router, browserHistory} from 'react-router';
import routes from './routes';


export default class extends React.Component {
	render() {
		return (
			<Router history={browserHistory} routes={routes}/>
		)
	}
}
