/**
 * Created by Lightstaff on 2016/09/22.
 */

import electron from 'electron';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import PhotoCameraIcon from 'material-ui/svg-icons/image/photo-camera';
import QuestionAnswerIcon from 'material-ui/svg-icons/action/question-answer';
import * as muiColors from 'material-ui/styles/colors';

import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import theme from '../../helper/theme';
import cssStyles from './App.css';

const muiTheme = getMuiTheme(theme);
const remote = electron.remote;

export default class App extends BaseComponent {
  static propTypes = {
    app: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    appActions: PropTypes.object.isRequired,
    errorsActions: PropTypes.object.isRequired,
    children: PropTypes.node,
  };

  handleCloseTouchTap = () => {
    remote.getCurrentWindow().close();
  };

  handleQuestionViewTouchTap = () => {
    const { appActions } = this.props;
    appActions.setQuizView(0);
  };

  handlePhotoViewTouchTap = () => {
    const { appActions } = this.props;
    appActions.setQuizView(1);
  };

  handleProgressModalClose = () => {
    const { appActions } = this.props;
    appActions.stopLoading();
  };

  handleErrorModalClose = () => {
    const { errorsActions } = this.props;
    errorsActions.removeError();
  };

  render() {
    const { app, errors, children } = this.props;
    const HeaderRightButtons = [
      <IconButton
        tooltip="アタックチャンス"
        onTouchTap={this.handlePhotoViewTouchTap}
      >
        <PhotoCameraIcon
          color={muiColors.white}
          hoverColor={muiColors.deepPurple500}
        />
      </IconButton>,
      <IconButton
        tooltip="クイズ"
        onTouchTap={this.handleQuestionViewTouchTap}
      >
        <QuestionAnswerIcon
          color={muiColors.white}
          hoverColor={muiColors.deepPurple500}
        />
      </IconButton>
    ];
    const errorModalActions = [
      <FlatButton
        label="HIDE"
        primary
        onTouchTap={this.handleErrorModalClose}
      />
    ];
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={cssStyles.container}>
          <div className={cssStyles.header_box}>
            <div className={cssStyles.header_right}>
              { app.get('isStartGame') ? (
                HeaderRightButtons[app.get('quizViewIndex')]
              ) : null}
            </div>
            <div className={cssStyles.header_center}>
              <h1>
                {app.get('headerText')}
              </h1>
            </div>
            <div className={cssStyles.header_right}>
              <IconButton
                tooltip="終了"
                onTouchTap={this.handleCloseTouchTap}
              >
                <CloseIcon
                  color={muiColors.white}
                  hoverColor={muiColors.deepPurple500}
                />
              </IconButton>
            </div>
          </div>
          <div className={cssStyles.main_box}>
            {children}
          </div>
          <div className={cssStyles.footer_box}>
            <Link to="/">初期設定へ</Link>
          </div>
          <Dialog
            modal={false}
            open={errors.get('hasError')}
            actions={errorModalActions}
            onRequestClose={this.handleErrorModalClose}
          >
            {errors.get('error') ? errors.get('error').toString() : ''}
          </Dialog>
          <Dialog
            modal={false}
            open={app.get('isLoading')}
            onRequestClose={this.handleProgressModalClose}
          >
            <div className={cssStyles.progress_box}>
              <CircularProgress />
            </div>
          </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}
