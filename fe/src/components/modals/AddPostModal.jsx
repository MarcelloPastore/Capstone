import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSession } from '../../middleware/ProtectedRoutes';
import '../../CSS/globalCss.css';

const AddPostModal = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    img: null,
    user: '',
    description: '',
  });

  const token = JSON.parse(localStorage.getItem('userLoggedIn'));
  const session = useSession();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileChange = (e) => {
    setFormData({ ...formData, img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fileData = new FormData();
      fileData.append('img1', formData.img);

      const uploadResponse = await fetch('http://localhost:6969/revPosts/cloudUpload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: fileData,
      });

      if (uploadResponse.ok) {
        const { img1: imagePath } = await uploadResponse.json();


        const postFormData = {
          title: formData.title,
          img1: imagePath,
          user: session.id,
          description: formData.description,
        };
        console.log(postFormData);
        const createResponse = await fetch('http://localhost:6969/revPosts/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(postFormData),
        });

        if (createResponse.ok) {
          // Post created successfully
          handleClose();
          // Add logic to update the post list or display a success message
        } else {
          console.error('Failed to create post:', createResponse.status, createResponse.statusText);
          // Handle the error, e.g., show an error message to the user
        }
      } else {
        console.error('Failed to upload image:', uploadResponse.status, uploadResponse.statusText);
        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error occurred:', error);
      // Handle other errors that may occur
    }
  };


  return (
    <div className='background'>
      <button className='create-button' onClick={handleShow}>
        Crea una nuova recensione
      </button>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton style={{ backgroundColor: 'antiquewhite' }}>
          <Modal.Title>Create a Review Post</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'antiquewhite' }}>
          <div className='modal-body-review'>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <div className='inputFile'>
                <input type="file" name="img1" onChange={handleFileChange} />
              </div>
              <textarea
                name="description"
                cols="30"
                rows="10"
                placeholder="Description"
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              >
              </textarea>
              <button className='submit-signIn' type="submit">Submit</button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: 'antiquewhite' }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddPostModal;
