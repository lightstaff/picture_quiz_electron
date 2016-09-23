/**
 * Created by Lightstaff on 2016/09/23.
 */

import React, { PropTypes } from 'react';

import cssStyles from './QuizPanel.css';

const QuizPanel = ({ indexPath, number, isOpen, onTouchTap }) => {
  const handleTouchTap = () => onTouchTap(indexPath);
  const styles = {
    container: {
      backgroundColor: isOpen ? 'rgba(0, 0, 0, 0)' : 'rgba(98, 0, 234, 1.0)',
    },
    button: {
      color: isOpen ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 1)',
      borderColor: isOpen ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 1)',
    },
  };
  return (
    <div className={cssStyles.container} style={styles.container} >
      <button
        className={cssStyles.button}
        style={styles.button}
        onTouchTap={handleTouchTap}
      >
        {number}
      </button>
    </div>
  );
};

QuizPanel.propTypes = {
  indexPath: PropTypes.object.isRequired,
  number: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onTouchTap: PropTypes.func.isRequired,
};

export default QuizPanel;
