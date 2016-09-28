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
    imgs: PropTypes.object.isRequired,
    panels: PropTypes.object.isRequired,
    imgsActions: PropTypes.object.isRequired,
    panelsActions: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { imgs, panelsActions } = this.props;
    if (imgs.get('currentIndex') !== nextProps.imgs.get('currentIndex')) {
      panelsActions.closePanels();
    }
  }

  handleNextTouchTap = () => {
    const { imgsActions } = this.props;
    imgsActions.nextImg();
  };

  handlePrevTouchTap = () => {
    const { imgsActions } = this.props;
    imgsActions.prevImg();
  };

  handlePanelTouchTap = (indexPath) => {
    const { panelsActions } = this.props;
    panelsActions.togglePanel(indexPath);
  };

  render() {
    const { imgs, panels } = this.props;
    const imgPath = imgs.get('items').get(imgs.get('currentIndex')).get('path');
    const canPrev = 0 < imgs.get('currentIndex');
    const canNext = imgs.get('currentIndex') < imgs.get('indexes');
    return (
      <div className={cssStyles.container}>
        <div className={cssStyles.main_box}>
          <div className={cssStyles.main_left}>
            <IconButton
              tooltip="前の写真へ"
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
              tooltip="次の写真へ"
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
