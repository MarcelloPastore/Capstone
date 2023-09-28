import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import '../CSS/globalCss.css'

const Footer = () => {
    return (
        <div className='main-section-footer ' >
            <Container>
                <Row>
                    <Col>
                        <div className='footer-img-container'>
                            <img
                                src="https://res.cloudinary.com/do1eu7dnn/image/upload/v1695891139/GaberBlog_logo_completo_no_background_oz46kq.png"
                                alt="logo.png"
                                width="300"
                                height="auto"
                                className="d-inline-block align-top"
                            />
                        </div>
                        
                    </Col>
                    <Col>
                        <div>
                            <ul className='footer-list'>
                                <p>Contact Information</p>
                                <li>mail to: info@gamerblog.it</li>
                                <li>Site Owner: Marcello Pastore</li>
                            </ul>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <ul className='footer-list'>
                                <p>Customer Care</p>
                                <li>Contact us </li>
                                <li>FAQs</li>
                                <li>need help?</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div className='icon-container'>
                        <FontAwesomeIcon icon={faXTwitter} className='all-icon' />
                        <FontAwesomeIcon icon={faFacebook} className='all-icon' />
                        <FontAwesomeIcon icon={faInstagram} className='all-icon' />
                        <FontAwesomeIcon icon={faLinkedin} className='all-icon' />
                    </div>
                </Row>
            </Container>
            <div className='copyright-style'>
                <p>© Copyright 2023 GamerBlog</p>
                <p>Creator: Marcello Pastore</p>
            </div>
        </div>
    )
}

export default Footer