import React, { useEffect, useState } from 'react';
import { useSession } from '../middleware/ProtectedRoutes';
import { Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import SingleCard from './SingleCard';
import { Link } from 'react-router-dom';
import '../CSS/globalCss.css'

const AuthorBio = () => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);
    const session = useSession();

    const handlePost = async () => {
        try {
            const response = await axios.get('http://localhost:6969/revPosts/byUserId?userId=' + session.id);

            if (response.status === 200) {
                // Access the posts from response.data.payload
                setPosts(response.data.payload);
                
            }
        } catch (error) {
            console.error('API Error:', error);
        }
    }
    const handleUser = async () => {
        try {
            const response = await axios.get('http://localhost:6969/users/' + session.id);

            if (response.status === 200) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.error('User error: ' + error);
        }
    }

    useEffect(() => {
        handlePost();
        handleUser();
    }, [session.id]);

    return (
        <div className='authorBio-section'>
            <div className='biografia'>
                <h1>Bentornato {session.nickname}</h1>
                <div className='user-info'>
                    
                        <img className='user-img-container'src={user.profilePicture} alt="userImage.png" />
                    
                    <div className='user-data-container'>
                        <div >
                            <p> Name:  {user.name} </p>
                            <p> Surname:  {user.surname} </p>
                        </div>
                        <div>
                            <p> Age: {user.age}</p>
                            <p> Email: {user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Container>
                <Row className="justify-content-center">
                    {Array.isArray(posts) &&
                        posts.map((post) => {
                            return (
                                <Col xs={12} sm={6} md={4} lg={3} key={post._id}>
                                    <Link to={'/Success/' + post._id} className='link-card'>
                                        <SingleCard
                                            title={post.title}
                                            img={post.img1}
                                            description={post.description}
                                            user={post.user.nickname}
                                            likes={post.likes}
                                            views={post.views}
                                        />
                                    </Link>
                                </Col>
                            );
                        })}
                </Row>
            </Container>
        </div>

    );
}

export default AuthorBio;
