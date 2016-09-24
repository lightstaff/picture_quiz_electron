/**
 * Created by Lightstaff on 2016/09/22.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from '../actions/app';
import * as fetchLocalFilesActions from '../actions/fetchLocalFiles';
import * as panelsActions from '../actions/panels';
import Home from '../components/Home/Home.jsx';

const mapStateToProps = state => ({
  files: state.files,
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch),
  fetchLocalFilesActions: bindActionCreators(fetchLocalFilesActions, dispatch),
  panelsActions: bindActionCreators(panelsActions, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class HomeContainer extends Component {
  static propTypes = {
    files: PropTypes.object.isRequired,
    appActions: PropTypes.object.isRequired,
    fetchLocalFilesActions: PropTypes.object.isRequired,
    panelsActions: PropTypes.object.isRequired,
  };

  render() {
    const { files, appActions, fetchLocalFilesActions, panelsActions } = this.props;
    return (
      <Home
        files={files}
        setHeaderText={appActions.setHeaderText}
        requestFetchLocalFiles={fetchLocalFilesActions.requestFetchLocalFiles}
        makePanels={panelsActions.makePanels}
      />
    )
  }
}
