export const addCard = (card) => ({
  type: 'ADD_CARD',
  payload: card
});

export const deleteCard = (ids) => ({
  type: 'DELETE_CARD',
  payload: ids
});

export const addBucket = (bucket) => ({
  type: 'ADD_BUCKET',
  payload: bucket
});

export const addHistory = (history) => ({
  type: 'ADD_HISTORY',
  payload: history
});
