/**
 * Created by Lightstaff on 2016/09/23.
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import cssStyles from './PicturePanel.css';

export default class PicturePanel extends BaseComponent {
  static propTypes = {
    indexPath: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onTouchTap: PropTypes.func.isRequired,
  };

  handleTouchTap = () => {
    const { indexPath, onTouchTap } = this.props;
    onTouchTap(indexPath);
  };

  render() {
    const { number, isOpen } = this.props;
    const containerClass = classNames(cssStyles.container, {
      [cssStyles.container_open]: isOpen,
      [cssStyles.container_close]: !isOpen,
    });
    const buttonClass = classNames(cssStyles.button, {
      [cssStyles.button_open]: isOpen,
      [cssStyles.button_close]: !isOpen,
    });
    return (
      <div
        className={containerClass}
      >
        <button
          className={buttonClass}
          onTouchTap={this.handleTouchTap}
        >
          {number}
        </button>
      </div>
    );
  }
}
