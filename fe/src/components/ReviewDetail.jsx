import React, { useState, useEffect } from 'react';
import '../CSS/globalCss.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ReviewDetail = () => {
  const { id } = useParams()
  const [reviewPost, setReviewPost] = useState({})
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const handleSingleRevPost = async () => {
    try {
      const response = await axios.get('http://localhost:6969/revPost/' + id);
      console.log('Single Post: ', response);

      if (response.status === 200) {
        setReviewPost(response.data.review);
        // After fetching the data, set isLoading to false
        setIsLoading(false);
      }

    } catch (error) {
      console.error('Error: ' + error)
    };
  };

  useEffect(() => {
    // Simulate a delay using setTimeout
    const delay = 2000; // Adjust the delay time as needed (in milliseconds)

    // Start the delay
    const delayTimer = setTimeout(() => {
      handleSingleRevPost();
    }, delay);

    // Clear the timer when the component unmounts
    return () => clearTimeout(delayTimer);
  }, [id]);

  return (
    <div className='detail-section'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='detail-container'>
          <div className='detail-img-container'>
            <img src={reviewPost.img1} alt="ReviewImg.png" />
          </div>
          <h1>{reviewPost.title}</h1>
          <div className='detail-body-container'>
            <p>{reviewPost.description}</p>
            <div className='detail-user-info'>
              <img src={reviewPost.user.profilePicture} alt="UserImg.png" />
              <p>{reviewPost.user.nickname}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewDetail;
