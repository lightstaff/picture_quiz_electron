/**
 * Created by Lightstaff on 2016/09/22.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from '../actions/app';
import * as panelsActions from '../actions/panels';
import * as pdfActions from '../actions/pdf';
import * as imgsActions from '../actions/imgs';
import * as errorsActions from '../actions/errors';
import Quiz from '../components/Quiz/Quiz.jsx';

const mapStateToProps = state => ({
  app: state.app,
  imgs: state.imgs,
  pdf: state.pdf,
  panels: state.panels,
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch),
  errorsActions: bindActionCreators(errorsActions, dispatch),
  imgsActions: bindActionCreators(imgsActions, dispatch),
  pdfActions: bindActionCreators(pdfActions, dispatch),
  panelsActions: bindActionCreators(panelsActions, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class QuizContainer extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    imgs: PropTypes.object.isRequired,
    pdf: PropTypes.object.isRequired,
    panels: PropTypes.object.isRequired,
    appActions: PropTypes.object.isRequired,
    errorsActions: PropTypes.object.isRequired,
    imgsActions: PropTypes.object.isRequired,
    pdfActions: PropTypes.object.isRequired,
    panelsActions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Quiz {...this.props} />
    );
  }
}
