/**
 * Created by Lightstaff on 2016/09/22.
 */

import electron from 'electron';
import { Map } from 'immutable';
import lodash from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';

import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import cssStyles from './Home.css';

const path = require('path');

const remote = electron.remote;
const dialog = remote.dialog;
const app = remote.app;

const muiStyles = {
  buttonStyle: {
    margin: 12,
  },
  paperStyle: {
    marginTop: 5,
    marginButton: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

export default class Home extends BaseComponent {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static propTypes = {
    imgs: PropTypes.object.isRequired,
    pdf: PropTypes.object.isRequired,
    appActions: PropTypes.object.isRequired,
    errorsActions: PropTypes.object.isRequired,
    pdfActions: PropTypes.object.isRequired,
    imgsActions: PropTypes.object.isRequired,
    panelsActions: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: new Map({
        panelRow: 4,
        panelColumn: 4,
        stepIndex: 0,
        finished: false,
        canCOMDialogOpen: true,
      }),
    }
  }

  componentDidMount() {
    const { appActions, imgsActions, pdfActions } = this.props;
    appActions.setHeaderText('初期設定');
    appActions.stopGame();
    imgsActions.resetImgs();
    pdfActions.resetPdf();
  }

  handleRowChange = async(e) => {
    const { data } = this.state;
    await this.setState({
      data: data.update('panelRow', () => e.target.value),
    });
  };

  handleColumnChange = async(e) => {
    const { data } = this.state;
    await this.setState({
      data: data.update('panelColumn', () => e.target.value),
    });
  };

  handleStepPrevTouchTap = async() => {
    const { data } = this.state;
    const stepIndex = data.get('stepIndex') - 1;
    await this.setState({
      data: data.update('stepIndex', () => stepIndex)
        .update('finished', () => false),
    });
  };

  handleRowColumnCommitTouchTap = async() => {
    const { panelsActions } = this.props;
    const { data } = this.state;
    panelsActions.makePanels(data.get('panelRow'), data.get('panelColumn'));
    await this.setState({
      data: data.update('stepIndex', stepIndex => stepIndex + 1),
    });
  };

  handleSetPdfFileTouchTap = async() => {
    const { errorsActions, pdfActions } = this.props;
    const { data } = this.state;
    const options = {
      title: 'フォルダを選んでください',
      defaultPath: app.getPath('userDesktop'),
      properties: ['openFile'],
    };
    await this.setState({
      data: data.update('canCOMDialogOpen', () => false),
    });
    dialog.showOpenDialog(options, (files) => {
      if (0 < files.length) {
        if (path.extname(files[0]) !== '.pdf') {
          errorsActions.addError(new Error('選択されたファイルがPDFファイルではありません。'));
          return;
        }
        pdfActions.setPdfPath(files[0]);
      }
      this.setState({
        data: data.update('canCOMDialogOpen', () => true),
      });
    });
  };

  handleSetPdfFileCommitTouchTap = async() => {
    const { pdfActions } = this.props;
    const { data } = this.state;
    pdfActions.requestFetchPdf();
    await this.setState({
      data: data.update('stepIndex', stepIndex => stepIndex + 1),
    });
  };

  handleReadImgFilesTouchTap = async() => {
    const { imgsActions } = this.props;
    const { data } = this.state;
    const options = {
      title: 'フォルダを選んでください',
      defaultPath: app.getPath('userDesktop'),
      properties: ['openDirectory'],
    };
    await this.setState({
      data: data.update('canCOMDialogOpen', () => false),
    });
    dialog.showOpenDialog(options, (folder) => {
      if (0 < folder.length) {
        imgsActions.setImgsPath(folder[0]);
      }
      this.setState({
        data: data.update('canCOMDialogOpen', () => true),
      });
    });
  };

  handleReadFilesCommitTouchTap = async() => {
    const { imgsActions } = this.props;
    const { data } = this.state;
    imgsActions.requestFetchImgs();
    await this.setState({
      data: data.update('stepIndex', stepIndex => stepIndex + 1)
        .update('finished', () => true),
    });
  };

  handleStepResetTouchTap = async() => {
    const { data } = this.state;
    await this.setState({
      data: data.update('stepIndex', () => 0)
        .update('finished', () => false),
    });
  };

  handleStartTouchTap = () => {
    const { router } = this.context;
    const { imgs, pdf, errorsActions } = this.props;
    if (pdf.get('pdfDocument') === null) {
      errorsActions.addError(new Error('PDFファイルが不正です。再度読み込んでください。'));
      return;
    }
    if (imgs.get('items').size === 0) {
      errorsActions.addError(new Error('写真フォルダにJPG/PNG形式のファイルがありません。'));
      return;
    }
    router.push('/quiz');
  };

  render() {
    const { imgs, pdf } = this.props;
    const { data } = this.state;
    return (
      <div className={cssStyles.container}>
        <div className={cssStyles.main_box}>
          <Stepper
            activeStep={data.get('stepIndex')}
            orientation="vertical"
          >
            <Step>
              <StepLabel>行数と列数を設定してください</StepLabel>
              <StepContent>
                <div className={cssStyles.step}>
                  <TextField
                    id={lodash.uniqueId('text_field_')}
                    floatingLabelText="パネル行数"
                    floatingLabelFixed
                    defaultValue={data.get('panelRow')}
                    onChange={this.handleRowChange}
                  />
                  <TextField
                    id={lodash.uniqueId('text_field_')}
                    floatingLabelText="パネル列数"
                    floatingLabelFixed
                    defaultValue={data.get('panelColumn')}
                    onChange={this.handleColumnChange}
                  />
                  <div>
                    <RaisedButton
                      label="NEXT"
                      primary
                      style={muiStyles.buttonStyle}
                      onTouchTap={this.handleRowColumnCommitTouchTap}
                    />
                  </div>
                </div>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>クイズのPDFファイルを選択してください。</StepLabel>
              <StepContent>
                <div className={cssStyles.step}>
                  <div>
                    <div className={cssStyles.read_files}>
                      <FlatButton
                        label="ファイル選択"
                        primary
                        disabled={!data.get('canCOMDialogOpen')}
                        onTouchTap={this.handleSetPdfFileTouchTap}
                      />
                      <span>...</span>
                      { pdf.get('path') !== '' ? (
                        <div>
                          <span>選択されたファイル:</span>
                          <span>{pdf.get('path')}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <RaisedButton
                      label="NEXT"
                      primary
                      style={muiStyles.buttonStyle}
                      disabled={pdf.get('path') === ''}
                      onTouchTap={this.handleSetPdfFileCommitTouchTap}
                    />
                    <FlatButton
                      label="BACK"
                      style={muiStyles.buttonStyle}
                      onTouchTap={this.handleStepPrevTouchTap}
                    />
                  </div>
                </div>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>アタックチャンスの写真が入っているフォルダを選択してください</StepLabel>
              <StepContent>
                <div className={cssStyles.step}>
                  <div className={cssStyles.read_files}>
                    <FlatButton
                      label="フォルダ選択"
                      primary
                      disabled={!data.get('canCOMDialogOpen')}
                      onTouchTap={this.handleReadImgFilesTouchTap}
                    />
                    <span>...</span>
                    { imgs.get('path') !== '' ? (
                      <div>
                        <span>選択されたフォルダ:</span>
                        <span>{imgs.get('path')}</span>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <RaisedButton
                      label="NEXT"
                      primary
                      style={muiStyles.buttonStyle}
                      disabled={imgs.get('path') === ''}
                      onTouchTap={this.handleReadFilesCommitTouchTap}
                    />
                    <FlatButton
                      label="BACK"
                      style={muiStyles.buttonStyle}
                      onTouchTap={this.handleStepPrevTouchTap}
                    />
                  </div>
                </div>
              </StepContent>
            </Step>
          </Stepper>
          { data.get('finished') && (
            <div className={cssStyles.start_box}>
              <FlatButton
                label="START!!"
                style={muiStyles.buttonStyle}
                primary
                onTouchTap={this.handleStartTouchTap}
              />
              <FlatButton
                label="RESET"
                style={muiStyles.buttonStyle}
                onTouchTap={this.handleStepResetTouchTap}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
