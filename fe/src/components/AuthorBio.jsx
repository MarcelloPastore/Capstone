import React from 'react'
import { useSession } from '../middleware/ProtectedRoutes';
import { Card, Row, Col, Container } from 'react-bootstrap';



const AuthorBio = () => {

    const session = useSession();
    console.log(session);

    return (
        <Container>
            <h1>Ciao {session.nickname} </h1>
        </Container>
    )
}

export default AuthorBio