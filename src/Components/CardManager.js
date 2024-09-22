import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ card, bucketId, onDelete }) => {
  const isYouTubeUrl = (url) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <motion.div 
      className="card" 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.2 }}
    >
      <h4>{card.name}</h4>
      {isYouTubeUrl(card.link) ? (
        <iframe
          width="100%"
          height="315"
          src={getYouTubeEmbedUrl(card.link)}
          title={card.name}
          frameBorder="0"
          allowFullScreen
          style={{ borderRadius: '8px', marginBottom: '10px' }}
        />
      ) : (
        <video
          width="100%"
          controls
          src={card.link}
          title={card.name}
          style={{ borderRadius: '8px', marginBottom: '10px' }}
        >
          Your browser does not support the video tag.
        </video>
      )}
      <button className='btn btn-danger' onClick={() => onDelete(bucketId, card.id)}>Delete</button>
    </motion.div>
  );
};

export default Card;
