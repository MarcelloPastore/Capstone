import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SingleCard from './SingleCard';
import { useSelector } from 'react-redux';
import { selectAllPosts } from '../states/revPostStates';
import SearchBar from './SearchBar';
import '../CSS/RevPostRelease.css'; // Import the CSS file

const RevPostsRelease = () => {
  const [posts, setPosts] = useState([])
  const allPosts = useSelector(selectAllPosts)
  const handler = () =>{
    setPosts(allPosts);
  }

  useEffect(() => {
    handler()
  })
  
  
  return (
    <>
    <SearchBar posts={posts} setPosts={setPosts} handler={handler}/>
    <Container>
      <Row className="justify-content-center">
        {Array.isArray(posts.reviewPosts) &&
          posts.reviewPosts.map((post) => {
            return (
              <Col xs={12} sm={6} md={4} lg={3} key={post._id}>
                <SingleCard
                  title={post.title}
                  img={post.img1}
                  description={post.description}
                  user={post.user.nickname}
                  likes={post.likes}
                  views={post.views}
                />
              </Col>
            );
          })}
      </Row>
    </Container>
    </>
    
  );
};

export default RevPostsRelease;
