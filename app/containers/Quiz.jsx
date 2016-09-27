/**
 * Created by Lightstaff on 2016/09/22.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from '../actions/app';
import * as panelsActions from '../actions/panels';
import Quiz from '../components/Quiz/Quiz.jsx';

const mapStateToProps = state => ({
  files: state.files,
  panels: state.panels,
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch),
  panelsActions: bindActionCreators(panelsActions, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class QuizContainer extends Component {
  static propTypes = {
    files: PropTypes.object.isRequired,
    panels: PropTypes.object.isRequired,
    appActions: PropTypes.object.isRequired,
    panelsActions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Quiz
        {...this.props}
      />
    );
  }
}
