import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faEye } from '@fortawesome/free-solid-svg-icons';
import '../CSS/globalCss.css';

const SingleCard = ({ img, title, description, likes, user, views }) => {
 
  return (
    <Card className="mb-4" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} alt="Image" />
      <Card.Body>
        <Card.Title>
          {title}
        </Card.Title>
        <div className="description">
          <Card.Text className="description-text">{description}</Card.Text>
        </div>
        <Card.Text>
          <FontAwesomeIcon icon={faThumbsUp} /> Likes: {likes}
        </Card.Text>
        <Card.Text>
          <FontAwesomeIcon icon={faEye} /> Views: {views}
        </Card.Text>
        <Card.Text>Author: {user}</Card.Text>
        <Button variant="primary" >
          Read More
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SingleCard;
