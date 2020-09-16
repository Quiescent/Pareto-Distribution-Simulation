import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { simulationReducer } from './simulationReducer';

export default combineReducers({
  form: formReducer,
  simulation: simulationReducer
});
