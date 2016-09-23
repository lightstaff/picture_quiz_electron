/**
 * Created by Lightstaff on 2016/09/22.
 */

import { createAction } from 'redux-actions';

export const ADD_ERROR = 'ADD_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

export const addError = createAction(ADD_ERROR, error => error);
export const removeError = createAction(REMOVE_ERROR);
