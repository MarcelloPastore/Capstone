import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import '../CSS/globalCss.css';

const SignInSession = () => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        profilePicture: 'https://res.cloudinary.com/do1eu7dnn/image/upload/v1695891132/GaberBlog_logo_no_background_yap8cw.png',
        surname: '',
        age: null,
        email: '',
        password: '',
        nickname: '',
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleFileChange = (e) => {
        setFormData({ ...formData, profilePicture: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const fileData = new FormData();
            fileData.append('profilePicture', formData.profilePicture);

            const uploadResponse = await fetch('http://localhost:6969/user/cloudUpload', {
                method: 'POST',
                body: fileData
            })

            if (uploadResponse.ok) {
                const { profilePicture: imagePath } = await uploadResponse.json();

                const userFormData = {
                    name: formData.name,
                    profilePicture: imagePath,
                    surname: formData.surname,
                    age: formData.age,
                    email: formData.email,
                    password: formData.password,
                    nickname: formData.nickname,
                };
                console.log(userFormData)
                const createResponse = await fetch('http://localhost:6969/user/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userFormData),
                });

                if (createResponse.ok) {
                    handleClose();
                } else {
                    console.error('Failed to create user: ' + createResponse.status, createResponse.statusText);
                }
            } else {
                console.error('Error occurred: ', uploadResponse.statusText, uploadResponse.statusText);
            }
        } catch (error) {
            console.error('Error occurred: ', error);
        }
    };


    return (
        <>
            <button className='button-signIn' onClick={handleShow}>
                Sign In
            </button>

            <Modal  show={show} onHide={handleClose}>
                <Modal.Header style={{backgroundColor: 'antiquewhite'}} closeButton>
                    <Modal.Title> Unisciti al gruppo! </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor: 'antiquewhite'}}>
                    <div className='signIn-modal-body'>
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <input
                                type="text"
                                name='name'
                                placeholder='Name'
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <input
                                type="text"
                                name='surname'
                                placeholder='Surname'
                                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                            />
                            <div className='inputFile'>
                                <span>Scegli la tua foto profilo</span>
                                <input
                                type="file"
                                name='profilePicture'
                                onChange={handleFileChange}
                            />
                            </div>
                            <input
                                type="text"
                                name='email'
                                placeholder='Email Address'
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <input
                                type="number"
                                name='Age'
                                placeholder='Set your age'
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            />
                            <input
                                type="password"
                                name='password'
                                placeholder='Set password'
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <input
                                type="text"
                                name='nickname'
                                placeholder='Nickname'
                                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                            />
                            <button className='submit-signIn' type='submit'  >Submit</button>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{backgroundColor: 'antiquewhite'}}>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SignInSession