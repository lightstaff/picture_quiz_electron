/**
 * Created by Lightstaff on 2016/09/22.
 */

import { createAction } from 'redux-actions';

export const MAKE_PANELS = 'MAKE_PANELS';
export const RESET_PANELS = 'RESET_PANELS';
export const TOGGLE_PANEL = 'TOGGLE_PANEL';

export const makePanels = createAction(MAKE_PANELS, (row, column) => ({
  row,
  column,
}));
export const resetPanels = createAction(RESET_PANELS);
export const togglePanel = createAction(TOGGLE_PANEL, indexPath => indexPath);
