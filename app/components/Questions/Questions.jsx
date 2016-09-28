/**
 * Created by Lightstaff on 2016/09/27.
 */

import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeftIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import KeyboardArrowRightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import * as muiColors from 'material-ui/styles/colors';

import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import cssStyles from './Questions.css'

export default class Questions extends BaseComponent {
  static propTypes = {
    pdf: PropTypes.object.isRequired,
    pdfActions: PropTypes.object.isRequired,
    errorsActions: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { pdf } = this.props;
    if (nextProps.pdf.get('currentPage') !== 0 && pdf.get('currentPage') !== nextProps.pdf.get('currentPage')) {
      this.renderPdf(nextProps.pdf.get('currentPage'));
    }
  }

  componentDidMount() {
    const { pdf } = this.props;
    this.renderPdf(pdf.get('currentPage'));
  }

  renderPdf = async(page) => {
    const { pdf, errorsActions } = this.props;
    if (pdf.get('pdfDocument') !== null) {
      try {
        const pdfPage = await pdf.get('pdfDocument').getPage(page);
        const { canvas } = this.refs;
        const cx = canvas.getContext('2d');
        const viewport = pdfPage.getViewport(1.0);
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        pdfPage.render({
          canvasContext: cx,
          viewport,
        });
      } catch (err) {
        errorsActions.addError(err);
      }
    }
  };

  handlePrevTouchTap = () => {
    const { pdfActions } = this.props;
    pdfActions.prevPdf();
  };

  handleNextTouchTap = () => {
    const { pdfActions } = this.props;
    pdfActions.nextPdf();
  };

  render() {
    const { pdf } = this.props;
    const canNext = pdf.get('currentPage') < pdf.get('pages');
    const canPrev = 1 < pdf.get('currentPage');
    return (
      <div className={cssStyles.container}>
        <div className={cssStyles.main_box}>
          <div className={cssStyles.main_left}>
            <IconButton
              tooltip="前のページへ"
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
            <div className={cssStyles.canvas_box}>
              <canvas
                className={cssStyles.canvas}
                ref="canvas"
              />
            </div>
          </div>
          <div className={cssStyles.main_right}>
            <IconButton
              tooltip="次のページへ"
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
    )
  }
};
