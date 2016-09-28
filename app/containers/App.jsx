/**
 * Created by Lightstaff on 2016/09/22.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from '../actions/app';
import * as errorsActions from '../actions/errors';
import App from '../components/App/App.jsx';

const mapStateToProps = state => ({
  app: state.app,
  errors: state.errors,
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch),
  errorsActions: bindActionCreators(errorsActions, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class AppContainer extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    children: PropTypes.node,
    appActions: PropTypes.object.isRequired,
    errorsActions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <App {...this.props} />
    )
  }
}
