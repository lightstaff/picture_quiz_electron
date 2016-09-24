/**
 * Created by Lightstaff on 2016/09/22.
 */

import { range } from 'lodash';
import { List, Map } from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = new List();

export default handleActions({
  MAKE_PANELS: (state, action) => {
    const row = action.payload.row;
    const column = action.payload.column;
    const rows = [];
    let num = 1;
    range(row).map(i => {
      const columns = [];
      range(column).map(j => {
        columns.push(new Map({
          columnIndex: j,
          isOpen: false,
          number: num,
        }));
        num += 1;
      });
      rows.push(new Map({
        rowIndex: i,
        columns: new List(columns),
      }));
    });
    return new List(rows);
  },
  RESET_PANELS: state => state.map(row => row.update('columns', columns =>
    columns.map(column => column.update('isOpen', () => false)))),
  TOGGLE_PANEL: (state, action) => {
    const rowIndex = action.payload.rowIndex;
    const columnIndex = action.payload.columnIndex;
    return state.map((row) => {
      if (rowIndex === row.get('rowIndex')) {
        return row.update('columns', columns => columns.map((column) => {
          if (columnIndex === column.get('columnIndex')) {
            return column.update('isOpen', isOpen => !isOpen);
          }
          return column;
        }));
      }
      return row;
    });
  },
}, initialState);
