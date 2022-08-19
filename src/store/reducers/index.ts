import { combineReducers } from '@reduxjs/toolkit';
import configuration, { name as confSliceName } from './configuration';

const rootReducer = combineReducers({
  [confSliceName]: configuration,
});

export default rootReducer;
