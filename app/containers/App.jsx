/**
 * Created by Lightstaff on 2016/09/22.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import App from '../components/App/App.jsx';

const mapStateToProps = state => ({
  app: state.app,
  errors: state.errors,
});

@connect(mapStateToProps)
export default class AppContainer extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    children: PropTypes.node,
  };

  render() {
    const { app, errors, children } = this.props;
    return (
      <App
        app={app}
        errors={errors}
        children={children}
      />
    )
  }
}
