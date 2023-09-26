import React from 'react';
import jwtDecode from 'jwt-decode';
import Login from '../pages/Login';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const auth = () => {
    return JSON.parse(localStorage.getItem('userLoggedIn'))
};

export const useSession = () => {
    const session = auth();
    const decodedSession = session ? jwtDecode(session) : null;

    const navigate = useNavigate();

    useEffect(() => {
        if (!session) {
            navigate('/login', {replace: true});
        }
    }, [navigate, session]);

    return decodedSession;
};

export const ProtectedRoutes = () => {
    const isAuthorized = auth();
    return isAuthorized ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;