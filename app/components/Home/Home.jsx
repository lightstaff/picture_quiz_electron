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
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

import cssStyles from './Home.css';

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

class Home extends Component {
  static propTypes = {
    files: PropTypes.object.isRequired,
    setHeaderText: PropTypes.func.isRequired,
    requestFetchLocalFiles: PropTypes.func.isRequired,
    makePanels: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: new Map({
        panelRow: 4,
        panelColumn: 4,
        stepIndex: 0,
        finished: false,
      }),
    };
  }

  componentDidMount() {
    this.props.setHeaderText('HOME');
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
    const { data } = this.state;
    this.props.makePanels(data.get('panelRow'), data.get('panelColumn'));
    await this.setState({
      data: data.update('stepIndex', stepIndex => stepIndex + 1),
    });
  };

  handleReadFilesTouchTap = () => {
    const options = {
      title: 'フォルダを選んでください',
      defaultPath: app.getPath('userDesktop'),
      properties: ['openDirectory'],
    };
    dialog.showOpenDialog(options, (folder) => {
      if (0 < folder.length) {
        this.props.requestFetchLocalFiles(folder[0], '.jpg');
      }
    });
  };

  handleReadFilesCommitTouchTap = async() => {
    const { data } = this.state;
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

  render() {
    const { files } = this.props;
    const { data } = this.state;
    const listIcon = (
      <FontIcon className="material-icons" >photo_camera</FontIcon>
    );
    return (
      <div className={cssStyles.container} >
        <div className={cssStyles.main_box} >
          <Stepper
            activeStep={data.get('stepIndex')}
            orientation="vertical"
          >
            <Step>
              <StepLabel>行列設定</StepLabel>
              <StepContent>
                <div className={cssStyles.step_one} >
                  <TextField
                    id={lodash.uniqueId('text_field_')}
                    floatingLabelText="パネル列数"
                    floatingLabelFixed
                    defaultValue={data.get('panelRow')}
                    onChange={this.handleRowChange}
                  />
                  <TextField
                    id={lodash.uniqueId('text_field_')}
                    floatingLabelText="パネル行数"
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
              <StepLabel>ファイル選択</StepLabel>
              <StepContent>
                <div className={cssStyles.step_two} >
                  <div className={cssStyles.read_files} >
                    <FlatButton
                      label="ファイル読込"
                      primary
                      onTouchTap={this.handleReadFilesTouchTap}
                    />
                    <span>...</span>
                    { 0 < files.get('items').size ? (
                      <div>
                        <span>読み込まれたファイル</span>
                        <List>
                          { files.get('items').map((item, index) => (
                            <ListItem
                              key={index}
                              leftIcon={listIcon}
                              primaryText={item.get('fileName')}
                            />
                          )) }
                        </List>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <RaisedButton
                      label="NEXT"
                      primary
                      style={muiStyles.buttonStyle}
                      disabled={0 === files.get('items').size}
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
            <div className={cssStyles.start_box} >
              <Link to="/quiz" >START!!</Link>
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

export default Home;
