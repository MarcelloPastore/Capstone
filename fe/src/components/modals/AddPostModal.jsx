import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AddPostModal = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    img: null,
    user: '',
    description: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileChange = (e) => {
    setFormData({ ...formData, img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fileData = new FormData();
      fileData.append('img', formData.img);

      // Upload the image to the server
      const uploadResponse = await fetch('http://localhost:6969/revPosts/internalUpload', {
        method: 'POST',
        body: fileData,
      });
      console.log('Upload Response:', uploadResponse);
      const { img: imagePath } = await uploadResponse.json();

      // Create the review post with the image path
      const postFormData = {
        title: formData.title,
        img: imagePath,
        user: formData.user,
        description: formData.description,
      };

      const createResponse = await fetch('http://localhost:6969/revPosts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postFormData),
      });

      if (createResponse.ok) {
        // Post created successfully
        handleClose();
        // Add logic to update the post list or display a success message
      } else {
        // Handle errors if the creation request fails
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Review Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Review Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <input
              type="file"
              name="img"
              onChange={handleFileChange}
            />
            <input
              type="text"
              name="user"
              placeholder="Username"
              onChange={(e) => setFormData({ ...formData, user: e.target.value })}
            />
            <textarea
              name="description"
              cols="30"
              rows="10"
              placeholder="Description"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddPostModal;
