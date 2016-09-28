/**
 * Created by Lightstaff on 2016/09/27.
 */

import React, { PropTypes } from 'react';

import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import Questions from '../Questions/Questions.jsx';
import Pictures from '../Pictures/Pictures.jsx';
import cssStyles from './Quiz.css';

export default class Quiz extends BaseComponent {
  static propTypes = {
    app: PropTypes.object.isRequired,
    imgs: PropTypes.object.isRequired,
    pdf: PropTypes.object.isRequired,
    panels: PropTypes.object.isRequired,
    appActions: PropTypes.object.isRequired,
    pdfActions: PropTypes.object.isRequired,
    imgsActions: PropTypes.object.isRequired,
    errorsActions: PropTypes.object.isRequired,
    panelsActions: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { app, appActions } = this.props;
    const titles = ['クイズ', 'アタックチャンス'];
    if (app.get('quizViewIndex') !== nextProps.app.get('quizViewIndex')) {
      appActions.setHeaderText(titles[nextProps.app.get('quizViewIndex')]);
    }
  }

  componentDidMount() {
    const { appActions } = this.props;
    appActions.startGame();
    appActions.setQuizView(0);
  }

  render() {
    const { app, imgs, pdf, panels, imgsActions, pdfActions, errorsActions, panelsActions } = this.props;
    const views = [
      <Questions
        pdf={pdf}
        pdfActions={pdfActions}
        errorsActions={errorsActions}
      />,
      <Pictures
        imgs={imgs}
        panels={panels}
        imgsActions={imgsActions}
        panelsActions={panelsActions}
      />
    ];
    return (
      <div className={cssStyles.container}>
        { views[app.get('quizViewIndex')]}
      </div>
    );
  }
}
