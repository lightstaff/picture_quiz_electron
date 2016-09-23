/**
 * Created by Lightstaff on 2016/09/22.
 */

import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './containers/App.jsx';
import Home from './containers/Home.jsx';
import Quiz from './containers/Quiz.jsx';

const AppRouter = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute components={Home} />
      <Route path="/quiz" component={Quiz} />
    </Route>
  </Router>
);

AppRouter.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AppRouter;
