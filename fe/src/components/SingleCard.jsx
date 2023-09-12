import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// import { Link } from 'react-router-dom';

const SingleCard = ({img1, _id, title, description, likes, views, user}) => {
  return (
    <Card style={{width: '18rem'}}>
        <Card.Img variant='top' src=''/>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{_id}</Card.Text>
            <Card.Text>{description}</Card.Text>
            <Card.Text>{likes}</Card.Text>
            <Card.Text>{views}</Card.Text>
            <Card.Text>{user}</Card.Text>
            <Button variant='primary'> Ciao! </Button>
        </Card.Body>
    </Card>
  )
}

export default SingleCard;