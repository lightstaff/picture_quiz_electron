/**
 * Created by Lightstaff on 2016/09/22.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from '../actions/app';
import * as fetchLocalFilesActions from '../actions/fetchLocalFiles';
import * as panelsActions from '../actions/panels';
import Home from '../components/Home/Home.jsx';

const HomeContainer = ({
  files,
  setHeaderText,
  requestFetchLocalFiles,
  makePanels,
}) => (
  <Home
    files={files}
    setHeaderText={setHeaderText}
    requestFetchLocalFiles={requestFetchLocalFiles}
    makePanels={makePanels}
  />
);

HomeContainer.propTypes = {
  files: PropTypes.object.isRequired,
  setHeaderText: PropTypes.func.isRequired,
  requestFetchLocalFiles: PropTypes.func.isRequired,
  makePanels: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  files: state.files,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    ...appActions,
    ...fetchLocalFilesActions,
    ...panelsActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
