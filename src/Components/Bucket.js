import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Card from './CardManager';
import './buket.css'; // Import your custom CSS file

const Bucket = () => {
  const [newBucketName, setNewBucketName] = useState('');
  const [newCardName, setNewCardName] = useState('');
  const [newCardLink, setNewCardLink] = useState('');
  const dispatch = useDispatch();
  const buckets = useSelector(state => state.buckets || []);

  useEffect(() => {
    const fetchBuckets = async () => {
      const response = await axios.get('http://localhost:5000/buckets');
      dispatch({ type: 'SET_BUCKETS', payload: response.data });
    };
    fetchBuckets();
  }, [dispatch]);

  const createBucket = async () => {
    const newBucket = { name: newBucketName, cards: [], id: Date.now() };
    await axios.post('http://localhost:5000/buckets', newBucket);
    dispatch({ type: 'ADD_BUCKET', payload: newBucket });
    setNewBucketName('');
  };

  const addCard = async (bucketId) => {
    const newCard = { name: newCardName, link: newCardLink, id: Date.now() };
    const bucketResponse = await axios.get(`http://localhost:5000/buckets/${bucketId}`);
    const bucket = bucketResponse.data;

    const updatedBucket = { ...bucket, cards: [...bucket.cards, newCard] };
    await axios.put(`http://localhost:5000/buckets/${bucketId}`, updatedBucket);
    dispatch({ type: 'ADD_CARD', payload: { bucketId, card: newCard } });
    setNewCardName('');
    setNewCardLink('');
  };

  const deleteCard = async (bucketId, cardId) => {
    const bucketResponse = await axios.get(`http://localhost:5000/buckets/${bucketId}`);
    const bucket = bucketResponse.data;
    const updatedCards = bucket.cards.filter(card => card.id !== cardId);
    const updatedBucket = { ...bucket, cards: updatedCards };
    await axios.put(`http://localhost:5000/buckets/${bucketId}`, updatedBucket);
    dispatch({ type: 'SET_BUCKETS', payload: buckets.map(b => b.id === bucketId ? updatedBucket : b) });
  };

  return (
    <div className="container">
      <h2>Buckets</h2>
      <div className="input-group mb-3" style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={newBucketName} 
          onChange={(e) => setNewBucketName(e.target.value)} 
          placeholder="New Bucket Name" 
          className="form-control"
        />
        <button className="btn btn-primary" onClick={createBucket}>Create Bucket</button>
      </div>
  
      {buckets.map(bucket => (
        <div className="bucket mb-4" key={bucket.id}>
          <h3>{bucket.name}</h3>
          <div className="input-group mb-3">
            <input 
              type="text" 
              value={newCardName} 
              onChange={(e) => setNewCardName(e.target.value)} 
              placeholder="Card Name" 
              className="form-control"
            />
            <input 
              type="text" 
              value={newCardLink} 
              onChange={(e) => setNewCardLink(e.target.value)} 
              placeholder="Video/Audio Link" 
              className="form-control"
            />
            <button className="btn btn-success" onClick={() => addCard(bucket.id)}>Add Card</button>
          </div>
          
          <div className="card-container">
            {bucket.cards && bucket.cards.map((card) => (
              <Card key={card.id} card={card} bucketId={bucket.id} onDelete={deleteCard} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bucket;
