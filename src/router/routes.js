import React from 'react';
import {Route, IndexRoute } from 'react-router';

import MainMenu from '../ui/MainMenu';
import Game from '../ui/Game';

var routes = (
	<Route path="/">
		<IndexRoute component={MainMenu} />

		<Route path="play" component={Game}/>
		<Route path="settings" />
		<Route path="about" />
	</Route>
);

export default routes;
