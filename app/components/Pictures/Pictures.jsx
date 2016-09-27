/**
 * Created by Lightstaff on 2016/09/22.
 */

import { Map } from 'immutable';
import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeftIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import KeyboardArrowRightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import * as muiColors from 'material-ui/styles/colors';

import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import PicturePanel from './PicturePanel.jsx';
import cssStyles from './Pictures.css';

export default class Pictures extends BaseComponent {
  static propTypes = {
    files: PropTypes.object.isRequired,
    panels: PropTypes.object.isRequired,
    appActions: PropTypes.object.isRequired,
    panelsActions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const { files } = props;
    this.state = {
      indexes: new Map({
        current: 0,
        max: files.get('items').size - 1,
      }),
    };
  }

  componentWillMount() {
    const { panelsActions } = this.props;
    panelsActions.closePanels();
  }

  componentDidMount() {
    const { appActions } = this.props;
    const { indexes } = this.state;
    appActions.setHeaderText(`第${indexes.get('current') + 1}問`);
  }

  handleNextTouchTap = async() => {
    const { appActions, panelsActions } = this.props;
    const { indexes } = this.state;
    if (indexes.get('current') < indexes.get('max')) {
      panelsActions.closePanels();
      await this.setState({
        indexes: indexes.update('current', current => current + 1),
      });
      appActions.setHeaderText(`第${this.state.indexes.get('current') + 1}問`);
    }
  };

  handlePrevTouchTap = async() => {
    const { appActions, panelsActions } = this.props;
    const { indexes } = this.state;
    if (0 < indexes.get('current')) {
      panelsActions.closePanels();
      await this.setState({
        indexes: indexes.update('current', current => current - 1),
      });
      appActions.setHeaderText(`第${this.state.indexes.get('current') + 1}問`);
    }
  };

  handlePanelTouchTap = (indexPath) => {
    const { panelsActions } = this.props;
    panelsActions.togglePanel(indexPath);
  };

  render() {
    const { files, panels } = this.props;
    const { indexes } = this.state;
    const imgPath = files.get('items').get(indexes.get('current')).get('path');
    const canPrev = 0 < indexes.get('current');
    const canNext = indexes.get('current') < indexes.get('max');
    return (
      <div className={cssStyles.container}>
        <div className={cssStyles.main_box}>
          <div className={cssStyles.main_left}>
            <IconButton
              tooltip="前の問題へ"
              onTouchTap={this.handlePrevTouchTap}
              disabled={!canPrev}
            >
              <KeyboardArrowLeftIcon
                color={muiColors.teal500}
                hoverColor={muiColors.tealA200}
              />
            </IconButton>
          </div>
          <div className={cssStyles.main_center}>
            <div className={cssStyles.panel_box}>
              { panels.map(row => (
                <div
                  className={cssStyles.panel_row}
                  key={row.get('rowIndex')}
                >
                  { row.get('columns').map(column => (
                    <div
                      className={cssStyles.panel_column}
                      key={column.get('columnIndex')}
                    >
                      <PicturePanel
                        indexPath={{
                          rowIndex: row.get('rowIndex'),
                          columnIndex: column.get('columnIndex'),
                        }}
                        number={column.get('number')}
                        isOpen={column.get('isOpen')}
                        onTouchTap={this.handlePanelTouchTap}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className={cssStyles.img_box}>
              <img className={cssStyles.img} alt="Answer" src={imgPath} />
            </div>
          </div>
          <div className={cssStyles.main_right}>
            <IconButton
              tooltip="次の問題へ"
              onTouchTap={this.handleNextTouchTap}
              disabled={!canNext}
            >
              <KeyboardArrowRightIcon
                color={muiColors.teal500}
                hoverColor={muiColors.tealA200}
              />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}
