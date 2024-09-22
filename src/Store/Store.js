import { createStore } from 'redux';
import cardReducer from '../reducers/CardReducer';

const store = createStore(cardReducer);
export default store;
