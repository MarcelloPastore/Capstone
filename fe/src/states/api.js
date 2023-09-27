import axios from "axios";

const API_BASE_URL = 'http://localhost:6969'; // Replace with your API base URL

export const updateLikes = async (postId) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/revPosts/incrementLikes/${postId}`);
    return response.data.likes;
  } catch (error) {
    console.error('Error updating likes:', error);
    throw error;
  }
};

export const updateViews = async (postId) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/revPosts/incrementViews/${postId}`);
    return response.data.views;
  } catch (error) {
    console.error('Error updating views:', error);
    throw error;
  }
};

  