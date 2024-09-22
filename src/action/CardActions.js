import axios from 'axios';

export const deleteCard = (cardId, bucketId) => async (dispatch) => {
  await axios.delete(`http://localhost:5000/buckets/${bucketId}/cards/${cardId}`);
  dispatch({ type: 'DELETE_CARD', payload: { cardId, bucketId } });
};

export const addCard = (card, bucketId) => async (dispatch) => {
  const response = await axios.post(`http://localhost:5000/buckets/${bucketId}/cards`, card);
  dispatch({ type: 'ADD_CARD', payload: { bucketId, card: response.data } });
};
