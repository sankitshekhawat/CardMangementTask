const initialState = {
  buckets: [],
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BUCKETS':
      return { ...state, buckets: action.payload };
    case 'ADD_BUCKET':
      return { ...state, buckets: [...state.buckets, action.payload] };
    case 'DELETE_BUCKET':
      return {
        ...state,
        buckets: state.buckets.filter(bucket => bucket.id !== action.payload),
      };
    case 'ADD_CARD':
      return {
        ...state,
        buckets: state.buckets.map(bucket =>
          bucket.id === action.payload.bucketId
            ? { ...bucket, cards: [...bucket.cards, action.payload.card] }
            : bucket
        ),
      };
    case 'DELETE_CARD':
      return {
        ...state,
        buckets: state.buckets.map(bucket =>
          bucket.id === action.payload.bucketId
            ? { ...bucket, cards: bucket.cards.filter(card => card.id !== action.payload.cardId) }
            : bucket
        ),
      };
    default:
      return state;
  }
};

export default cardReducer;
