/**
 * Created by Lightstaff on 2016/09/22.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as panelsActions from '../actions/panels';
import App from '../components/App/App.jsx';

const mapStateToProps = state => ({
  app: state.app,
  errors: state.errors,
});

const mapDispatchToProps = dispatch => ({
  panelsActions: bindActionCreators(panelsActions, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class AppContainer extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    children: PropTypes.node,
    panelsActions: PropTypes.object.isRequired,
  };

  render() {
    const { app, errors, children, panelsActions } = this.props;
    return (
      <App
        app={app}
        errors={errors}
        panelsActions={panelsActions}
        children={children}
      />
    )
  }
}
