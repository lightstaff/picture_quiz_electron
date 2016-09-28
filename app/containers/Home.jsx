/**
 * Created by Lightstaff on 2016/09/22.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from '../actions/app';
import * as errorsActions from '../actions/errors';
import * as imgsActions from '../actions/imgs';
import * as pdfActions from '../actions/pdf';
import * as panelsActions from '../actions/panels';
import Home from '../components/Home/Home.jsx';

const mapStateToProps = state => ({
  app: state.app,
  pdf: state.pdf,
  imgs: state.imgs,
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch),
  errorsActions: bindActionCreators(errorsActions, dispatch),
  pdfActions: bindActionCreators(pdfActions, dispatch),
  imgsActions: bindActionCreators(imgsActions, dispatch),
  panelsActions: bindActionCreators(panelsActions, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class HomeContainer extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    pdf: PropTypes.object.isRequired,
    imgs: PropTypes.object.isRequired,
    appActions: PropTypes.object.isRequired,
    errorsActions: PropTypes.object.isRequired,
    pdfActions: PropTypes.object.isRequired,
    imgsActions: PropTypes.object.isRequired,
    panelsActions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Home {...this.props} />
    )
  }
}
