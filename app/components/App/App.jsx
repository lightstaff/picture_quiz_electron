/**
 * Created by Lightstaff on 2016/09/22.
 */

import electron from 'electron';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
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
    panelsActions: PropTypes.object.isRequired,
    children: PropTypes.node,
  };

  handleCloseTouchTap = () => {
    remote.getCurrentWindow().close();
  };

  render() {
    const { app, errors, panelsActions, children } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={cssStyles.container}>
          <div className={cssStyles.header_box}>
            <div className={cssStyles.header_right} />
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
          <div className={cssStyles.main}>
            { errors.get('error') ? (
              <div>{errors.get('error')}</div>
            ) : null}
            {children}
          </div>
          <div className={cssStyles.footer}>
            <Link to="/">初期設定へ</Link>
            <button
              className={cssStyles.footer_button}
              onTouchTap={panelsActions.openPanels}
            >
              全てのパネルを開く
            </button>
            <button
              className={cssStyles.footer_button}
              onTouchTap={panelsActions.closePanels}
            >
              全てのパネルを閉じる
            </button>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
