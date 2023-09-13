import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SingleCard from './SingleCard';

import { useSelector } from 'react-redux';
import { selectAllPosts } from '../states/revPostStates';

const RevPostsRelease = () => {
  const posts = useSelector(selectAllPosts);
  console.log('Redux posts:', posts);
  
  return (
    <>
      <Container>
        <Row>
          {Array.isArray(posts.reviewPosts) && posts.reviewPosts.map((post) => {
            return (
              <Col xs={6} md={4} lg={3} key={post._id}>
                <SingleCard 
                  title={post.title}
                  img1={post.img1}
                  description={post.description}
                  user={post.user.nickname}
                  likes={post.likes}
                  views={post.views}
                />
              </Col>
            )
          })}
        </Row>
      </Container>
    </>
  )
};

export default RevPostsRelease;
