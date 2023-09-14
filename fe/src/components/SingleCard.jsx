import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../CSS/globalCss.css'

const SingleCard = ({ img, _id, title, description, likes, views, user }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} alt="Image" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{_id}</Card.Text>
        <div className="description">
          <Card.Text className="description-text">{description}</Card.Text>
        </div>
        <Card.Text>Likes: {likes}</Card.Text>
        <Card.Text>Views: {views}</Card.Text>
        <Card.Text>Author: {user}</Card.Text>
        <Button variant="primary">Read More</Button>
      </Card.Body>
    </Card>
  );
};

export default SingleCard;
