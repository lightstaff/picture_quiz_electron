/**
 * Created by Lightstaff on 2016/09/22.
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import theme from '../../helper/theme';

import cssStyles from './App.css';

const muiTheme = getMuiTheme(theme);

const App = ({ app, errors, children }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div className={cssStyles.container}>
      <div className={cssStyles.header}>
        <h1 className={cssStyles.header_text}>
          {app.get('headerText')}
        </h1>
      </div>
      <div className={cssStyles.main}>
        { errors.get('error') ? (
          <div>{errors.get('error')}</div>
        ) : null}
        {children}
      </div>
      <div className={cssStyles.footer}>
        <Link to="/">HOME</Link>
      </div>
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  app: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default App;
