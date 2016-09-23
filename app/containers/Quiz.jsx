/**
 * Created by Lightstaff on 2016/09/22.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from '../actions/app';
import * as panelsActions from '../actions/panels';
import Quiz from '../components/Quiz/Quiz.jsx';

const QuizContainer = ({
  files,
  panels,
  setHeaderText,
  resetPanels,
  togglePanel,
}) => (
  <Quiz
    files={files}
    panels={panels}
    setHeaderText={setHeaderText}
    resetPanels={resetPanels}
    togglePanel={togglePanel}
  />
);

QuizContainer.propTypes = {
  files: PropTypes.object.isRequired,
  panels: PropTypes.object.isRequired,
  setHeaderText: PropTypes.func.isRequired,
  resetPanels: PropTypes.func.isRequired,
  togglePanel: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  files: state.files,
  panels: state.panels,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    ...appActions,
    ...panelsActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizContainer);
