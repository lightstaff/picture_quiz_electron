/**
 * Created by Lightstaff on 2016/09/22.
 */

import { Map } from 'immutable';
import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import * as muiColors from 'material-ui/styles/colors';

import QuizPanel from './QuizPanel.jsx';

import cssStyles from './Quiz.css';

class Quiz extends Component {
  static propTypes = {
    files: PropTypes.object.isRequired,
    panels: PropTypes.object.isRequired,
    setHeaderText: PropTypes.func.isRequired,
    resetPanels: PropTypes.func.isRequired,
    togglePanel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      indexes: new Map({
        current: 0,
        max: props.files.get('items').size - 1,
      }),
    };
  }

  componentDidMount() {
    const { indexes } = this.state;
    this.props.setHeaderText(`第${indexes.get('current') + 1}問`);
  }

  handleNextTouchTap = async() => {
    const { indexes } = this.state;
    if (indexes.get('current') < indexes.get('max')) {
      await this.setState({
        indexes: indexes.update('current', current => current + 1),
      });
      this.props.resetPanels();
      this.props.setHeaderText(`第${this.state.indexes.get('current') + 1}問`);
    }
  };

  handlePrevTouchTap = async() => {
    const { indexes } = this.state;
    if (0 < indexes.get('current')) {
      await this.setState({
        indexes: indexes.update('current', current => current - 1),
      });
      this.props.resetPanels();
      this.props.setHeaderText(`第${this.state.indexes.get('current') + 1}問`);
    }
  };

  handlePanelTouchTap = (indexPath) => {
    this.props.togglePanel(indexPath);
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
              <FontIcon
                className="material-icons"
                color={muiColors.teal500}
                hoverColor={muiColors.tealA200}
              >
                keyboard_arrow_left
              </FontIcon>
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
                      <QuizPanel
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
              <FontIcon
                className="material-icons"
                color={muiColors.teal500}
                hoverColor={muiColors.tealA200}
              >
                keyboard_arrow_right
              </FontIcon>
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

export default Quiz;
