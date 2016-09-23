/**
 * Created by Lightstaff on 2016/09/23.
 */

import * as muiColors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
  spacing,
  fontFamily: 'helvetica, arial, "hiragino kaku gothic pro", meiryo, "ms pgothic", Robot, sans-serif',
  palette: {
    primary1Color: muiColors.teal500,
    primary2Color: muiColors.teal700,
    primary3Color: muiColors.grey400,
    accent1Color: muiColors.deepOrangeA200,
    accent2Color: muiColors.grey100,
    accent3Color: muiColors.grey500,
    textColor: muiColors.darkBlack,
    alternateTextColor: muiColors.white,
    canvasColor: muiColors.white,
    borderColor: muiColors.grey300,
    disabledColor: fade(muiColors.darkBlack, 0.3),
    pickerHeaderColor: muiColors.cyan500,
    clockCircleColor: fade(muiColors.darkBlack, 0.07),
    shadowColor: muiColors.fullBlack,
  },
};
