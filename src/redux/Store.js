import { createStore } from 'redux';

// Initial state
const initialState = {
  buckets: [],
};

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BUCKETS':
      return { ...state, buckets: action.payload };
    case 'ADD_BUCKET':
      return { ...state, buckets: [...state.buckets, action.payload] };
    case 'ADD_CARD':
      return {
        ...state,
        buckets: state.buckets.map(bucket =>
          bucket.id === action.payload.bucketId
            ? { ...bucket, cards: [...bucket.cards, action.payload.card] }
            : bucket
        ),
      };
    default:
      return state;
  }
};

// Create store
const store = createStore(rootReducer);

export default store;
