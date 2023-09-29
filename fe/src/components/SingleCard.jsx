import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faEye } from '@fortawesome/free-solid-svg-icons';
import '../CSS/globalCss.css';

const SingleCard = ({ img, title, description, likes, user, views }) => {
 
  return (
    <div className='singleCard-container' >
      <div className="card-div" >
        <div className='img-container'>
          <img src={img} alt="postImg." />
        </div>
        <div className='card-body'>
          <h2>
            {title}
          </h2>
          <div className="description">
            <p className="description-text">
              {description}
              </p>
          </div>
          <p>Author: {user}</p>
          <div className='card-icons'>
            <p>
              <FontAwesomeIcon icon={faThumbsUp} /> 
              <span>{likes}</span>
            </p>
            <p>
              <span>{views}</span>
              <FontAwesomeIcon icon={faEye} /> 
            </p>
          </div>
        </div>
      </div>
    </div>    

    
  );
};

export default SingleCard;
