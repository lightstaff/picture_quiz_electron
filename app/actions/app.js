/**
 * Created by Lightstaff on 2016/09/23.
 */

import { createAction } from 'redux-actions';

export const SET_HEADER_TEXT = 'SET_HEADER_TEXT';

export const setHeaderText = createAction(SET_HEADER_TEXT, text => text);
