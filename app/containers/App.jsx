/**
 * Created by Lightstaff on 2016/09/22.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import App from '../components/App/App.jsx';

const AppContainer = ({ app, errors, children }) => (
  <App
    app={app}
    errors={errors}
    children={children}
  />
);

AppContainer.propTypes = {
  app: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const mapStateToProps = state => ({
  app: state.app,
  errors: state.errors,
});

export default connect(mapStateToProps)(AppContainer);
