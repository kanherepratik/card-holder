import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory} from "react-router";


import LandingPage from './js/pages/landingPage';
import CardHolder from './js/pages/cardHolder';

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={LandingPage}>
		</Route>
		<Route path="cards/(:email)" name="cards" component={CardHolder}>
		</Route>
	</Router>
	, document.getElementById('root'));
// registerServiceWorker();
